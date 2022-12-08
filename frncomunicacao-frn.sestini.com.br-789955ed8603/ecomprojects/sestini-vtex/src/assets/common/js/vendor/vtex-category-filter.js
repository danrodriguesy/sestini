
(function ($) {
  const VtexCategoryFilter = {
    /**
     * Init Application
     */
    init($result, settings) {
      const self = this;

      self.options = $.extend(self.getDefaultOptions(), settings);
      self.options.$result = $result;

      self.start();
      self.bind();
    },

    start() {
      const self = this;

      self.request = self._setRequest();
      self._concatRequest();
      self._setPaginationInfo();

      self.options.pagination && self._setPaginationWrap();

      self._createButtons();

      self.checkAndStart();
    },

    _createButtons() {
      const self = this;

      $('.resultItemsWrapper div[id^=ResultItems]')
        .before(`
                <div class="cf-load-less__wrapper">
                    <button class="${self.options.classLoadLess} ${self.options.classLoadBtnHide}" title="${self.options.textLoadLess}">${self.options.textLoadLess}</button>
                </div>`)
        .after(`
                <div class="cf-load-more__wrapper">
                    <button class="${self.options.classLoadMore}" title="${self.options.textLoadMore}">${self.options.textLoadMore}</button>
                </div>`);
    },

    _setPaginationWrap() {
      const self = this;

      const $pagination = $('<div />', {
        class: self.options.classPagination,
      });

      self.options.$resultItemsWrapper.append($pagination);
    },


    /**
     * Check status
     */
    checkAndStart() {
      const self = this;

      self._checkRequestWithCookie() ? self.startWithCookie() : self.startWithoutCookie();

      $(document).trigger('init.vtexCategoryFilter', [self.options, self.request]);
    },

    _checkRequestWithCookie() {
      const self = this;

      if (typeof Cookies === 'undefined') {
        throw new Error('You need install this plugin https://github.com/js-cookie/js-cookie');

        return false;
      }

      const hash = parseInt(window.location.hash.substr(1));
      const cookie = Cookies.get(self.options.cookieName);

      if (typeof cookie === 'undefined') {
        return false;
      }

      const cookieRequest = JSON.parse(cookie);
      const localRequest = $.extend({}, self.request);

      return (
        !isNaN(hash)
        && typeof cookieRequest !== 'undefined'
        && localRequest.path === cookieRequest.path
      );
    },


    /**
     * Start Application
     */
    startWithCookie() {
      const self = this;

      self._setParamsFromCookie();
      self._applyCookieParams();

      self._getTotalItems((totalItems) => {
        self.options.totalItems = parseInt(totalItems);
        self.options.$totalItems.text(totalItems);
        self.options.totalPages = self._getTotalPages();

        self._checkAndLoadWithCookie();
      });
    },

    _checkAndLoadWithCookie() {
      const self = this;

      const pageNumber = self.request.query.PageNumber;
      const { totalPages } = self.options;

      $(document).trigger('initWithCookie.vtexCategoryFilter', [self.options, self.request]);

      if (self.options.pagination) {
        self._startPagination();
        self.load('html', pageNumber, () => {
          self._showItems(pageNumber);
        });

        return false;
      }

      if (pageNumber === totalPages && pageNumber !== 1) {
        self._showButton(self.options.classLoadLess);
        self._hideButton(self.options.classLoadMore);

        self.load('html', pageNumber, () => {
          self._showItems(pageNumber);
          self.load('prepend', pageNumber - 1);
        });
      } else if (pageNumber === 1) {
        self._startFirst(pageNumber, totalPages !== 1);
      } else if (pageNumber > 1) {
        self._showButton(self.options.classLoadMore);
        self._showButton(self.options.classLoadLess);

        self.load('html', pageNumber, () => {
          self._setUrlHash(pageNumber);
          self._showItems(pageNumber);

          self.load('append', pageNumber + 1, () => {
            self.load('prepend', pageNumber - 1, () => {
              self.request.query.PageNumber = pageNumber;
              self._concatRequest();
              self._saveCookie();
            });
          });
        });
      }
    },

    _startFirst(pageNumber, startSecond, callback) {
      const self = this;

      if (typeof startSecond === 'undefined') {
        startSecond = true;
      }

      if (self.options.pagination === true) {
        startSecond = false;
      }

      self._hideButton(self.options.classLoadLess);

      self.load('html', pageNumber, () => {
        self._showItems(pageNumber);
        self._saveCookie();

        if (startSecond) {
          self.load('append', pageNumber + 1, () => {
            if (self.options.totalPages === 0) {
              self._hideButton(self.options.classLoadLess);
              self._hideButton(self.options.classLoadMore);
            } else {
              self._showButton(self.options.classLoadMore);
              typeof callback !== 'undefined' && callback();
            }
          });
        } else {
          self._hideButton(self.options.classLoadMore);
          typeof callback !== 'undefined' && callback();
        }
      });
    },

    startWithoutCookie() {
      const self = this;

      self.options.$result.find('> div > ul > li')
        .attr('page', 1)
        .removeClass('last first');

      self._setUrlHash(1);
      self._saveCookie();

      if (self._checkDefaultParams()) {
        self._setDefaultParams();
      }

      if (self.options.pagination) {
        self._startPagination();
      }

      if (self.options.totalPages === 1) {
        self._hideButton(self.options.classLoadMore);
        self._disableButton(self.options.classLoadMore);

        if (self._checkDefaultParams() || self.options.checkHasDefaultParams) {
          self._startFirst(1, true);
        }
      } else if (self._checkDefaultParams() || self.options.checkHasDefaultParams) {
        self._startFirst(1, true);
      } else {
        self.load('append', 2);
      }
    },

    _startPagination() {
      const self = this;

      self._hideButton(self.options.classLoadMore);
      self._disableButton(self.options.classLoadMore);

      self._hideButton(self.options.classLoadLess);
      self._disableButton(self.options.classLoadLess);

      self._createPagination();
      self.bindPagination();
    },

    _clearPagination() {
      const self = this;

      self.options.$pagination.html('');
    },


    /**
     * Load status
     */
    load(method, page, callback) {
      const self = this;

      self.request.query.PageNumber = page;
      self._concatRequest();

      typeof callback === 'function' ? self._search(method, callback) : self._search(method);
    },

    _search(method, callback, attempts) {
      const self = this;

      $(document).trigger('beforeSearch.vtexCategoryFilter', [self.options, self.request]);

      if (typeof attempts === 'undefined') {
        attempts = 0;
      }

      const $list = self.options.$result.find('> div > ul');

      $.ajax({
        url: self.request.url,
        type: 'get',
        beforeSend() {
          $list.addClass(self.options.classShelfLoader);
        },
      }).then((response) => {
        const $products = $(response).find('ul');

        $products.find('.last, .first').removeClass('last first');
        $products.find('.helperComplement').remove();

        const $item = $products.find('li');
        $item.attr('page', self.request.query.PageNumber);
        $item.addClass(self.options.classItemPreLoad);

        const productsContent = $products.html() || '';
        $list[method](productsContent);
        window.console.log('Response Quantidade: ', response.length);

        // if ( response.length < 1 ) {
        // $list.html(`
        // <li class="cf-empty-search">
        // <h2 class="cf-empty-search__title">${self.options.textEmptyResult}</h2>
        // </li>
        // `);
        // }

        if (self.options.$result.is(':hidden')) {
          self.options.$result.show();
        }

        $(document).trigger('afterSearch.vtexCategoryFilter', [self.options, self.request]);
        $list.removeClass(self.options.classShelfLoader);

        attempts = 0;

        typeof callback === 'function' && callback(self);
      }, (response) => {
        if (response.status === 500 && attempts < self.options.attempts) {
          attempts++;
          self._search(method, callback, attempts);
        }

        throw new Error('Error on get page', response);
      })
        .always(() => {
          $list.removeClass(self.options.classShelfLoader);
        });
    },


    /**
     * Helpers
     */
    _setParamsFromCookie() {
      const self = this;

      const cookie = Cookies.get(self.options.cookieName);

      self.request = JSON.parse(cookie);
    },

    _applyCookieParams() {
      const self = this;

      self._setOrder();
      self._setFilters();
    },

    _setOrder() {
      const self = this;

      self.options.$selectOrder.val(self.request.O);
    },

    _setFilters(fq) {
      const self = this;

      var { fq } = self.request.query;

      for (const filter in fq) {
        const value = fq[filter];

        if (typeof value === 'function') {
          return true;
        }

        const $checkbox = self.options.$filters.find(`input[rel="fq=${value}"]`);

        if ($checkbox.length) {
          $checkbox
            .attr('checked', 'checked')
            .parent()
            .addClass(self.options.classFilterActive);
        }
      }
    },

    _checkDefaultParams() {
      const self = this;

      return !!Object.keys(self.options.defaultParams).length;
    },

    _setDefaultParams() {
      const self = this;

      if (self.request.query.hasOwnProperty('O')) {
        delete self.options.defaultParams.query.O;
      }

      self.request = $.extend(true, self.request, self.options.defaultParams);
    },

    _setUrlHash(page) {
      const self = this;

      const pageNumber = typeof page !== 'undefined' ? page : self.request.query.PageNumber;
      window.location.hash = pageNumber;
    },

    _showItems(page) {
      const self = this;

      $(document).trigger('beforeShowItems.vtexCategoryFilter', [self.options, self.request, page]);

      self.options.$result
        .find(`.${self.options.classItemPreLoad}[page="${page}"]`)
        .removeClass(self.options.classItemPreLoad);

      $(document).trigger('afterShowItems.vtexCategoryFilter', [self.options, self.request, page]);
    },

    _enableButton(button) {
      const self = this;

      $(`.${button}`).removeAttr('disabled');
    },

    _disableButton(button) {
      const self = this;

      $(`.${button}`).attr('disabled', 'disabled');
    },

    _hideButton(button) {
      const self = this;

      $(`.${button}`).addClass(self.options.classLoadBtnHide);
    },

    _showButton(button) {
      const self = this;

      $(`.${button}`).removeClass(self.options.classLoadBtnHide);
    },

    _getPageByType(type) {
      const self = this;

      const $items = self.options.$result.find('> div > ul > li');

      let method = 'last';
      let operation = '+';

      if (type === 'prev') {
        method = 'first';
        operation = '-';
      }

      const page = Number($items[method]().attr('page'));

      return {
        showPage: page,
        nextPage: eval(page + operation + 1),
      };
    },

    _concatRequest() {
      const self = this;

      const { query } = self.request;
      let url = `${self.request.route}?`;

      const len = Object.keys(query).length - 1;
      let index = 0;

      for (const item in query) {
        if (item === 'fq') {
          const fqResult = self._concatRequestFilter(query[item], item);
          url = url.concat(fqResult);
        } else {
          url = url.concat(item, '=', query[item]);
        }

        if (index !== len) {
          url = url.concat('&');
        }

        index++;
      }

      self.request.url = url;
    },

    _concatRequestFilter(array, item) {
      const self = this;

      let url = '';

      for (let i = 0, { length } = array; i < length; i++) {
        url = url.concat(item, '=', array[i]);

        if (i !== length - 1) {
          url = url.concat('&');
        }
      }

      return url;
    },

    _saveCookie(request) {
      const self = this;

      if (typeof request === 'undefined') {
        request = JSON.parse(JSON.stringify(self.request));
      }

      const requestStringify = JSON.stringify(request);

      Cookies.set(self.options.cookieName, requestStringify);
    },

    _loadNext(pageByType) {
      const self = this;

      if (pageByType.nextPage < 1 || pageByType.nextPage > self.options.totalPages) {
        return false;
      }

      return true;
    },

    _setPaginationInfo() {
      const self = this;

      self.options.totalItems = self._getTotalItems();
      self.options.totalPages = self._getTotalPages();
    },

    _loadFirst(callback) {
      const self = this;

      self._getTotalItems((totalItems) => {
        self.options.totalItems = parseInt(totalItems);
        self.options.$totalItems.text(totalItems);
        self.options.totalPages = self._getTotalPages();

        self._startFirst(1, !(self.options.totalPages < 2), callback);
      });
    },

    _getTotalItems(callback, attempts) {
      const self = this;

      /**
        * Get total items from API
        */
      if (typeof callback === 'function') {
        if (typeof attempts === 'undefined') {
          attempts = 0;
        }

        self._concatRequest();

        const requestUrl = self.request.url.replace('/buscapagina', '');
        const url = `/api/catalog_system/pub/products/search${requestUrl}&_from=0&_to=1`;

        $.ajax({
          url,
          type: 'get',
        }).then((response, textStatus, request) => {
          const resources = request.getResponseHeader('resources');
          const totalItems = parseInt(resources.split('/')[1]);

          attempts = 0;

          return callback(totalItems);
        }, (error) => {
          if (response.status === 500 && attempts < self.options.attempts) {
            attempts++;
            self._getTotalItems(callback, attempts);
          }

          throw new Error('Error on get total items', response);
        });

        return false;
      }

      /**
        * Get total items from element
        */
      const result = self.options.$totalItems.text();
      const pattern = /\D/g;
      const total = result.replace(pattern, '');

      return parseInt(Math.ceil(total));
    },

    _getTotalPages() {
      const self = this;

      const ps = self.request.query.PS;
      const { totalItems } = self.options;

      const totalPages = Math.ceil(totalItems / ps);

      return totalPages;
    },

    /**
     * Throttling enforces a maximum number of times a
     * function can be called over time.
     * As in 'execute this function at most once every 100 milliseconds.'
     * CSS-Tricks (https://css-tricks.com/the-difference-between-throttling-and-debouncing/)
     *
     * @example
     *   const handleKeydown = throttle((e) => {
     *     console.log(e.target.value)
     *   }, 300);
     *
     *   input.addEventListener('keydown', handleKeydown);
     */
    _throttle(callback, wait, context = this) {
      let timeout = null;
      let callbackArgs = null;

      const later = () => {
        callback.apply(context, callbackArgs);
        timeout = null;
      };

      return function () {
        if (!timeout) {
          callbackArgs = arguments;
          timeout = setTimeout(later, wait);
        }
      };
    },


    /**
     * Pagination
     */
    _createPagination() {
      const self = this;

      self.options.$pagination = $(`.${self.options.classPagination}`);

      self._createPaginationFirstButton();
      self._createPaginationPrevButton();
      self._createPaginationButtons();
      self._createPaginationNextButton();
      self._createPaginationLastButton();
    },

    _createPaginationFirstButton() {
      const self = this;

      const $first = $('<button />', {
        class: 'cf-pagination__button cf-pagination__button-first',
        page: '1',
      }).text(self.options.textPaginationFirst);
      self.options.$pagination.append($first);

      if (self.request.query.PageNumber === 1) {
        self._disablePaginationButton($first);
      }
    },

    _createPaginationPrevButton() {
      const self = this;

      const $prev = $('<button />', {
        class: 'cf-pagination__button cf-pagination__button-prev',
        page: self.request.query.PageNumber - 1,
      }).text(self.options.textPaginationPrev);
      self.options.$pagination.append($prev);

      if (self.request.query.PageNumber === 1) {
        self._disablePaginationButton($prev);
      }
    },

    _createPaginationButtons() {
      const self = this;

      for (var i = self.request.query.PageNumber - self.options.paginationRangeButtons; i <= self.request.query.PageNumber; i++) {
        if (i < 1 || i === self.request.query.PageNumber) {
          continue;
        }

        var $page = $('<button />', {
          class: 'cf-pagination__button cf-pagination__button-page',
          page: i,
        }).text(i);
        self.options.$pagination.append($page);
      }

      var $page = $('<button />', {
        class: 'cf-pagination__button cf-pagination__button-page cf-pagination__button-disabled cf-pagination__button-current',
        page: self.request.query.PageNumber,
        disabled: 'disabled',
      }).text(self.request.query.PageNumber);
      self.options.$pagination.append($page);

      for (var i = self.request.query.PageNumber + 1; i <= self.request.query.PageNumber + self.options.paginationRangeButtons; i++) {
        if (i > self._getTotalPages()) {
          continue;
        }

        var $page = $('<button />', {
          class: 'cf-pagination__button cf-pagination__button-page',
          page: i,
        }).text(i);
        self.options.$pagination.append($page);
      }
    },

    _createPaginationNextButton() {
      const self = this;

      const $next = $('<button />', {
        class: 'cf-pagination__button cf-pagination__button-next',
        page: self.request.query.PageNumber + 1,
      }).text(self.options.textPaginationNext);
      self.options.$pagination.append($next);

      if (self.request.query.PageNumber === self._getTotalPages()) {
        self._disablePaginationButton($next);
      }
    },

    _createPaginationLastButton() {
      const self = this;

      const $last = $('<button />', {
        class: 'cf-pagination__button cf-pagination__button-last',
        page: self._getTotalPages(),
      }).text(self.options.textPaginationLast);
      self.options.$pagination.append($last);

      if (self.request.query.PageNumber === self._getTotalPages()) {
        self._disablePaginationButton($last);
      }
    },

    _disablePaginationButton($element) {
      const self = this;

      $element
        .addClass('cf-pagination__button-disabled')
        .attr('disabled', 'disabled');
    },


    /**
     * Requests methods
     */
    _setRequest() {
      const self = this;

      const requestUrl = self._getRequestUrl();

      return self._splitRequestUrl(requestUrl);
    },

    _getRequestUrl() {
      const self = this;

      const scriptContent = self.options.$script.html();
      const pattern = /\/buscapagina\?.+&PageNumber=/gi;
      const url = pattern.exec(scriptContent)[0];

      return decodeURIComponent(url);
    },

    _splitRequestUrl(url) {
      const self = this;

      const splitUrl = url.split('?');
      const route = splitUrl[0];

      if (splitUrl.length > 1) {
        const { location } = window;
        const { search } = location;
        const queryStringVTEX = splitUrl[1];
        const queryStringBrowser = search.substr(1);
        const splitHash = queryStringVTEX.split('#');

        const query = splitHash[0];
        const hash = splitHash[1];

        self.options.queryObject = {};
        self.options.queryObject.fq = [];

        const pattern = new RegExp('([^=&]+)=([^&]*)', 'g');

        query.replace(pattern, (m, key, value) => {
          self._buildQueryStringVTEXParams(m, key, value, self);
        });
        queryStringBrowser.replace(pattern, (m, key, value) => {
          self._checkAndInsertQueryStringBrowserParams(m, key, value, self);
        });

        return ({
          route,
          query: self.options.queryObject,
          hash,
          url,
          path: window.location.pathname + window.location.search,
        });
      }

      return ({
        route,
        url,
      });
    },

    _buildQueryStringVTEXParams(m, key, value, self) {
      const urlValue = decodeURIComponent(value);
      const urlKey = decodeURIComponent(key);

      if (urlKey === 'fq') {
        self.options.queryObject[urlKey].push(urlValue);
      } else if (urlKey === 'PageNumber' && value === '') {
        self.options.queryObject[urlKey] = 1;
      } else {
        self.options.queryObject[urlKey] = urlValue;
      }
    },

    _checkAndInsertQueryStringBrowserParams(m, key, value, self) {
      const urlValue = decodeURIComponent(value);
      const urlKey = decodeURIComponent(key);

      if (urlKey == 'O') {
        self.options.queryObject[urlKey] = urlValue;
        self.options.checkHasDefaultParams = true;
      }
    },


    /**
     * Binding
     */
    bind() {
      const self = this;

      self.bindLoadMoreAndLess();
      self.bindOrder();
      self.bindFilters();
      self.bindBackToTop();
    },

    bindLoadMoreAndLess() {
      const self = this;

      $(`.${self.options.classLoadLess}, .${self.options.classLoadMore}`).on('click', function (event) {
        event.preventDefault();
        let shelfElements = $('.resultItemsWrapper').find('.x-shelf').find('ul > li')
        let shelfLength = shelfElements.length
        let type = 'next';
        let method = 'append';
        let hide = self.options.classLoadMore;
        if ($(this).hasClass(self.options.classLoadLess)) {
          type = 'prev';
          method = 'prepend';
          hide = self.options.classLoadLess;
        }

        if(type == 'next'){
          $('html, body').animate({
            scrollTop: $(shelfElements[shelfLength - 1]).offset().top + 200
          }, 1000);
        }

        const pageByType = self._getPageByType(type);

        const request = $.extend({}, self.request);
        request.query.PageNumber = pageByType.showPage;
        self._saveCookie(request);

        self._loadNext(pageByType) ? self.load(method, pageByType.nextPage) : self._hideButton(hide);

        self._setUrlHash(pageByType.showPage);
        self._showItems(pageByType.showPage);



      });
    },

    bindOrder() {
      const self = this;

      if (self.options.$selectOrder.attr('id') === 'O') {
        self.options.$selectOrder
          .removeAttr('onchange')
          .unbind('change')
          .off('change');
      }

      self.options.$selectOrder.on('change', function (event) {
        event.preventDefault();

        const _this = $(this);
        const value = _this.val();

        $(document).trigger('beforeChangeOrder.vtexCategoryFilter', [self.options, self.request, _this]);
        self._setUrlHash(1);
        self._changeOrder(value, () => {
          $(document).trigger('afterChangeOrder.vtexCategoryFilter', [self.options, self.request, _this]);
        });
      });
    },

    _changeOrder(value, callback) {
      const self = this;

      self.request.query.O = value;

      self._concatRequest();
      self._setUrlHash(1);

      self._loadFirst(callback);
    },

    bindFilters() {
      const self = this;

      self.options.$filters.on('click', function (event) {
        if (event.target.tagName !== 'INPUT') {
          return true;
        }

        const _this = $(this);
        const $checkbox = _this.find('input');
        const checked = $checkbox.is(':checked');
        const filter = $checkbox.attr('rel');

        if (checked) {
          _this.addClass(self.options.classFilterActive);
        } else {
          _this.removeClass(self.options.classFilterActive);
        }

        $(document).trigger('beforeFilter.vtexCategoryFilter', [self.options, self.request, _this]);
        self._refreshFilter(filter, checked, _this);
      });
    },

    bindBackToTop() {
      const self = this;

      self._createBackToTopBtn();

      const offset = 300;
      const offsetOpacity = 1200; // browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      const scrollTopDuration = 700; // duration of the top scrolling animation (in ms)
      const $backToTop = $(document).find(`.${self.options.classBackToTop}`); // grab the "back to top" link

      const scrollClasses = self._throttle((ev) => {
        const scrollTop = $(ev.currentTarget).scrollTop();

        (scrollTop > offset) ? $backToTop.addClass('is--visible') : $backToTop.removeClass('is--visible');
        (scrollTop > offsetOpacity) ? $backToTop.addClass('has--fade-out') : $backToTop.removeClass('has--fade-out');
      }, 50);

      // Hide or show the 'back to top' link
      $(window).on('scroll', scrollClasses);

      // Smooth scroll to top
      $backToTop.on('click', (ev) => {
        ev.preventDefault();

        $('body,html').animate({
          scrollTop: 0,
        }, scrollTopDuration);
      });
    },

    _createBackToTopBtn() {
      const self = this;

      $('body').append(`<button class="${self.options.classBackToTop}" title="${self.options.textBackToTop}">${self.options.textBackToTop}</button>`);
    },

    _refreshFilter(filter, action, _this) {
      const self = this;

      const filterMap = function (item) {
        const filterSplit = item.split('=');

        const key = filterSplit[0];
        const value = filterSplit[1];

        if (action) {
          self.request.query[key].push(value);
        } else {
          const index = self.request.query[key].indexOf(value);

          if (index > -1) {
            self.request.query[key].splice(index, 1);
          }
        }
      };

      if (typeof filter === 'object') {
        filter.map(filterMap);
      } else if (typeof filter === 'string') {
        filterMap(filter);
      }

      self._loadFirst(() => {
        $(document).trigger('afterFilter.vtexCategoryFilter', [self.options, self.request, _this || null]);
        self._setUrlHash(1);

        if (self.options.pagination) {
          self._clearPagination();
          self._createPagination();
        }

        self.bindPagination();
      });
    },

    bindPagination() {
      const self = this;

      $(`.${self.options.classPagination}`).find('button').on('click', function (e) {
        e.preventDefault();

        const _this = $(this);
        const page = parseInt(_this.attr('page'));

        $(document).trigger('beforeChangePage.vtexCategoryFilter', [self.options, self.request]);

        self.load('html', page, () => {
          self._setUrlHash(page);
          self._showItems(page);

          self.request.query.PageNumber = page;
          self._clearPagination();
          self._startPagination();
          self._concatRequest();
          self._saveCookie();

          $(document).trigger('afterChangePage.vtexCategoryFilter', [self.options, self.request]);
        });
      });
    },


    /**
     * Options
     */
    getDefaultOptions() {
      const self = this;

      return {
        // Elements
        $resultItemsWrapper: $('.resultItemsWrapper'),
        $script: $('.resultItemsWrapper').children('script'),
        $totalItems: $('.searchResultsTime:first .resultado-busca-numero .value'),
        $selectOrder: $('#O'),
        $filters: $('.search-multiple-navigator label'),

        // Classes
        classShelfLoader: 'has--shelf-loader',
        classFilterActive: 'is--filter-active',
        classItemPreLoad: 'is--shelf-item-preload',
        classLoadBtnHide: 'is--load-btn-hide',
        classLoadLess: 'cf-load-less',
        classLoadMore: 'cf-load-more',
        classPagination: 'cf-pagination',
        classBackToTop: 'cf-back-to-top',

        // Texts
        textLoadLess: 'Carregar anteriores',
        textLoadMore: 'Carregar mais',
        textPaginationFirst: 'Primeira',
        textPaginationPrev: 'Anterior',
        textPaginationNext: 'Próxima',
        textPaginationLast: 'Última',
        textEmptyResult: 'Esta combinação de filtros não retornou nenhum resultado!',
        textBackToTop: 'Retornar ao topo',

        // Pagination
        pagination: false,
        paginationRangeButtons: 3,

        // Others
        cookieName: '_vcf_search_query',
        defaultParams: {
          query: {
            O: 'OrderByReleaseDateDESC',
          },
        },
        attempts: 2,
      };
    },
  };

  $.fn.vtexCategoryFilter = function (settings) {
    const $result = this;

    VtexCategoryFilter.init($result, settings);

    return $result;
  };

  /**
     * Avoid VTEX animation
     */
  window.goToTopPage = function () { };

  $(() => {
    window.goToTopPage = function () { };
  });
}(jQuery));

// ALL EVENTS
// $(document).on('init.vtexCategoryFilter', (event, options, request) => window.console.log('init.vtexCategoryFilter'));
// $(document).on('initWithCookie.vtexCategoryFilter', (event, options, request) => window.console.log('initWithCookie.vtexCategoryFilter'));
// $(document).on('beforeSearch.vtexCategoryFilter', (event, options, request) => window.console.log('beforeSearch.vtexCategoryFilter'));
// $(document).on('afterSearch.vtexCategoryFilter', ( event, options, request) => window.console.log('afterSearch.vtexCategoryFilter'));
// $(document).on('beforeChangeOrder.vtexCategoryFilter', (vent, options, request, element) => window.console.log('beforeChangeOrder.vtexCategoryFilter'));
// $(document).on('afterChangeOrder.vtexCategoryFilter', (event, options, request, element) => window.console.log('afterChangeOrder.vtexCategoryFilter'));
// $(document).on('beforeFilter.vtexCategoryFilter', (event, options, request, element) => window.console.log('beforeFilter.vtexCategoryFilter'));
// $(document).on('afterFilter.vtexCategoryFilter', ( event, options, request, element) => window.console.log('afterFilter.vtexCategoryFilter'));
// $(document).on('beforeChangePage.vtexCategoryFilter', (event, options, request) => window.console.log('beforeChangePage.vtexCategoryFilter'));
// $(document).on('afterChangePage.vtexCategoryFilter', ( event, options, request) => window.console.log('afterChangePage.vtexCategoryFilter'));
// $(document).on('beforeShowItems.vtexCategoryFilter', ( event, options, request, page) => window.console.log('beforeShowItems.vtexCategoryFilter'));
// $(document).on('afterShowItems.vtexCategoryFilter', (event, options, request, page) => window.console.log('afterShowItems.vtexCategoryFilter'));
