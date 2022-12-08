(($) => {
  // It handles the requests for searching
  class SearchHTTP {
    get(settings) {
      if (settings.typedText && settings.qty && settings.shelfId) {
        return $.ajax(this.getPreparedUrl(settings));
      }
    }

    // Encode all settings and return the final uri for the search API resquest
    getPreparedUrl(settings) {
      const typedText = window.encodeURI(settings.typedText);
      const qty = window.encodeURI(settings.qty);
      const shelfId = window.encodeURI(settings.shelfId);

      return {
        url: `/buscapagina?&ft=${typedText}&PS=${qty}&sl=${shelfId}&cc=50&sm=0&PageNumber=1`,
        beforeSend() {
          $('body').addClass(settings.bodyClass);
        },
      };
    }
  }

  class SearchHelper {
    constructor() {
      // states, data and cached items
      this.typing = false;
      this.delay = 400;
      this.cache = {};

      // user configurations
      this.config = null;
    }

    setConfig(config) {
      this.config = config;
    }

    getTyping() {
      return this.typing;
    }

    getDelay() {
      return this.delay;
    }

    getCache(key) {
      return this.cache[key];
    }

    setTyping(value) {
      this.typing = value;
    }

    setDelay(value) {
      this.delay = value;
    }

    setCache(key, value) {
      this.cache[key] = value;
    }

    appendResults($items) {
      const $showMoreBtn = $('<button />', {
        class: 'search__show-more-btn',
        text: 'Ver mais',
        title: 'botão',
        'data-search-show-more': 'data-search-show-more',
      });

      const $showMoreBtnWrapper = $('<div />', {
        class: 'search__show-more-wrapper',
        append: $showMoreBtn,
      });

      this.config.appendTo
        .empty()
        .append($items)
        .append($showMoreBtnWrapper);

      this.requestEndEvent();
    }

    notFound() {
      if (!this.config.notFound) {
        const $warn = '<p><strong>Desculpe,</strong> nenhum produto foi encontrado para esta busca.</p>';
        this.config.appendTo.html($warn);
      } else if (this.config.notFound.call) {
        this.config.appendTo.html(this.config.notFound());
      }
    }

    cleanResults() {
      this.config.appendTo.empty();
    }

    requestEndEvent() {
      /* eslint-disable */
      const ev = new $.Event("requestEnd.vtexSearchAutocomplete");
      /* eslint-enable */

      setTimeout(() => $(document).trigger(ev), 0);
    }
  }

  const inputEvents = {
    init(context, settings) {
      this.watchInputEvent.apply(context, [settings]);
    },

    watchInputEvent(settings) {
      const sHelp = new SearchHelper();
      const sHttp = new SearchHTTP();

      sHelp.setConfig(settings);

      this.on('keyup focus', () => {
        sHelp.setTyping(true);

        setTimeout(() => {
          sHelp.setTyping(false);
        }, sHelp.getDelay());

        setTimeout(() => {
          if (!sHelp.getTyping()) {
            let typedText = this.val() || '';
            typedText = typedText.trim();

            if (typedText) {
              /**
               * it checks if the searched result was cached before,
               * then, no resquest is needed
               */
              if (sHelp.getCache(typedText)) {
                return sHelp.appendResults(sHelp.getCache(typedText));
              }

              /**
               * it uses HTTP helper to get the results
               * it requires an object with:
               *
               * typedText: 'the term to be used for searching',
               * qty: 'the max quantity of results to bring back',
               * shelfId: 'the shelf template id to use on the search'
               *
               * it returns an jQuery ajax promise object
               */
              const promise = sHttp.get({
                typedText,
                qty: settings.limit,
                shelfId: settings.shelfId,
                bodyClass: settings.bodyClass,
              });

              /**
               * it handles any possible error, and
               * call the callback error handler provided
               */
              promise.fail((err) => {
                console.log(err);
                sHelp.notFound();
              });

              /**
               * it handles the success,
               * append all the results and
               * save the search in cache
               */
              promise.success((data) => {
                if (!data) {
                  return sHelp.notFound();
                }

                const $productsList = $(data)
                  .find(`li[layout=${settings.shelfId}]`)
                  .removeAttr('layout')
                  .addClass('search__item');
                const $container = $('<ul />', {
                  class: 'search__items',
                  append: $productsList,
                });

                sHelp.appendResults($container);
                sHelp.setCache(typedText, $container);
              });

              promise.always((data) => {
                $('body').removeClass(settings.bodyClass);
              });
            } else {
              sHelp.cleanResults();
            }
          }
        }, sHelp.getDelay() + 50);
      });
    },

    watchOutputEvent() {
      // this.on('blur', () => {
      //   setTimeout(() => {
      //     sHelp.cleanResults();
      //   }, 500);
      // });
    },
  };

  /**
   * This function listen the event of the input and handles the auto complete resquest at any vtex based e-commerce.
   *
   * @param {object} options - an object is required by parameter with the followings keys and content:
   * @param {string} options.shelfId - the hash id of the shelf that should be rendered
   * @param {jQuery} options.appendTo - a jQuery object of the container where the results will be placed
   * @param {function} options.notFound - a callback function that returns a valid html text or an jQuery
   *   object, this result will be appended into the container when no results returns from the search
   * @param {number} options.limit - the number of the itens that should be placed at once
   */
  $.fn.vtexSearchAutocomplete = function (options) {
    const defaultSettings = {
      shelfId: null,
      appendTo: null,
      notFound: null,
      bodyClass: 'has--loader',
      limit: 10,
    };
    const settings = $.extend(defaultSettings, options);

    if (!settings.shelfId) {
      throw new Error('options.shelfId is required');
    }

    if (!settings.appendTo) {
      throw new Error('options.appendTo is required');
    }

    if (!(settings.appendTo instanceof jQuery)) {
      throw new Error(
        'options.appendTo should be an instance of jQuery. Example "$("#myContainer")"',
      );
    }

    inputEvents.init(this, settings);
  };

  /**
   * @example
   *    $('#myInput').vtexSearchAutocomplete({
   *        shelfId: '37a38486-2baa-4df1-9b0e-02f96f08fa73',
   *        appendTo: $('#results'),
   *        notFound: function(){ return 'not found' },
   *        limit: 3,
   *        bodyClass: 'has--loader',
   *    });
   */
})(jQuery);
