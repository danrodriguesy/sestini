
const Methods = {
    init: function() {
        console.log('foobar');
        
        
        // TODOS:
        // CACHE REQUESTS RESPONSES
        // SEPARATE ENDPOINTS AND SERVICES     
        // CUSTOM SCROLLBAR WITH JS
        
        // Namespace Sestini
        window.Sestini ? window.Sestini : window.Sestini = {};

        // Gmaps Instance
        Sestini.map = new GMaps({
            disableDefaultUI: true,
            div: '#map',
            center: {
                // Brazil Coordinates
                lat: -15.77972 ,
                lng: -47.92972,
            },            
        });



        var CacheSelectors = {
            storeLocator: {
                self: $('.js--store-locator'),
                distanceBtn: $('.js--store-locator-distance-btn'),
                results: $('.js--store-locator-results'),
                resultsContent: $('.js--store-locator-results-content'),
                group: $('.js--store-locator-group'),
                stateGroup : $('.js--store-locator-state-group'),
                stateTitle: $('.js--store-locator-state-title'),
                storeInfo: $('.js--store-locator-store-info'),
                infoContainer: $('.js--store-locator-info-container'),
                backBtn: $('.js--store-locator-back-btn'),
                stateSelect: $('#storeLocatorState'),
                stateCity: $('#storeLocatorCity'),
                map: $('#map'),
            },
        };
        
        var El = CacheSelectors.storeLocator;
        var Utils = {
            _removeAllActiveClass: function() {
                var $siblings = El.results.find('.js--pan-to-marker').parent();
                $siblings.removeClass('is--active');
            },    
        
            _dynamicSort: function(property) {
                var sortOrder = 1;
        
                if ( property[0] === '-' ) {
                    sortOrder = -1;
                    property = property.substr(1);
                }
        
                return function(a, b) {
                    var result = ( a[property] < b[property] ) ? -1 : ( a[property] > b[property] ) ? 1 : 0;
                    return result * sortOrder;
                }
            }
        };
        
        var Actions = {
            mapActions: function() {        
                $(document).on('click', '.js--pan-to-marker', function(ev) {
                    ev.preventDefault();
                    
                    var $this = $(ev.currentTarget);
                    var $index = $this.data('marker-index');
                    var marker = Sestini.map.markers[$index];
                    var position = marker.getPosition();
                    var lat = position.lat();
                    var lng = position.lng();
        
                    Utils._removeAllActiveClass();            
                    $this.parent().addClass('is--active');            
                    
                    Sestini.map.setCenter(lat, lng);
                    Sestini.map.setZoom(17);            
        
                    El.map.addClass('is--active');            
                    El.storeInfo.addClass('is--active');
        
                    if ( Sestini.isMobile ) {
                        // $(\'html, body').animate({scrollTop: 0}, 500);
                    }
                });
            },


            // var fetchConfig = {
            //     headers: {
            //       'REST-Range': 'resources=0-1000',
            //     },
            //   };

            getStores: function() { fetch('/api/dataentities/SL/search?_sort=nome ASC&_fields=_all', { headers:  {'REST-Range': 'resources=0-1000'} })
                .then(res => res.json())
                .then((data) => {
                    const stores = data
                    .filter(store => store.lat && store.lng)
                    .map(({
                        id, bairro, cidade, complemento, endereco, estado, lat, lng, nome, numero, celular, horario, email, telefone,
                    }) => ({
                        id,
                        nome,
                        lat,
                        lng,
                        celular,
                        estado,
                        horario,
                        email,
                        contato: `${telefone} ${celular ? `| ${celular}` : ''}`,
                        address: `${endereco}, ${numero} ${complemento || ''} - ${bairro} - ${cidade}/${estado}`,
                    }));

                    const states = stores
                    .map(({ estado }) => ({
                        nome: estado,
                        stores: stores.filter(store => store.estado === estado),
                    }))
                    .filter(({ nome }, index, array) => array.findIndex(estado => estado.nome === nome) === index)
                    .sort(({ nome: a }, { nome: b }) => a.localeCompare(b));

                    return {
                    states,
                    stores,
                    selectedStores: stores,
                    };
                });
            },
        
            selectActions: function() {
                var self = this;        
                El.stateSelect.on('change', function(ev) {
                    var $this = $(ev.currentTarget);
                    var value = $this.val();
                    Sestini.map.removeMarkers();
                    El.stateGroup.empty('<option>Cidade</options>');
        
                    El.stateCity                   
                        .html('<option>Cidade</options>')                   
                        .removeClass('is--active');
        
                    // GET CITIES BY STATE
                    $.ajax({
                        method: 'GET',
                        url : 'http://ec2-18-232-60-37.compute-1.amazonaws.com/ws/cities/with-dealers/' + value
                    })
                    .then(function(res) {                
                        var markup = res.data.reduce(function(acc,curr) {
                            return acc += '<option value="' + curr.city + '">' + curr.city + '</options>'                                    
                       }, '<option>Cidade</options>');            
           
                       El.stateCity
                           .focus()
                           .empty()
                           .append(markup)
                           .addClass('is--active');
                    })
        
                    .fail(function(err) {
                        console.log('Error on get Cities by state:' + err);
                    });            
                });


        
                El.stateCity.on('change', function(ev) {
                    var $this = $(ev.currentTarget);
                    var value = $this.val();
                    Sestini.map.removeMarkers();
                    El.stateGroup.empty();
                    
                    // GET STORES BY CITY
                    $.ajax({
                        method: 'GET',
                        url : 'http://ec2-18-232-60-37.compute-1.amazonaws.com/ws/dealers/list/by/' + El.stateSelect.val() + '/' + encodeURIComponent(value),
                    })
                    .then(function(res) {                        
                        self._setMarkers(res.data);
                    })
                    .fail(function(err) {
                        console.log('Error on get Stores by city:' + err);
                    });
                });
            },
            
            _setMarkers: function(data) {        
                var markersData = [];
        
                for ( var i = 0, len = data.length; i < len; i += 1 ) {
                    var item = data[i];
                    var lat = item.lat;
                    var lng = item.lng;
                    
                    if ( !!lat && !!lng) {
                        markersData.push({
                            data: item,
                            lat : lat,
                            lng : lng,
                            title : item.trade_name,
                            // details: {
                            //     imagePath: CONSTANTS.ICON_DEFAULT,
                            //     title: item.name,
                            // },
                            // icon : {
                            //     url : CONSTANTS.ICON_DEFAULT,
                            // },                    
                            click: function(ev) {
                                var data = ev.data;
                                
                                var $itemClicked = El.results.find('[data-store-id="' + data.id +'"]');
                                var container = $itemClicked.closest('.js--store-locator-state-group');                        
                                container.animate({
                                    scrollTop: $itemClicked.offset().top - container.offset().top + container.scrollTop() - 20
                                });
        
                                Utils._removeAllActiveClass();
                                $itemClicked.parent().addClass('is--active');
        
                                Sestini.map.setCenter(ev.data.lat, ev.data.lng);
                                Sestini.map.setZoom(17);
                            },
                        });
                    }
                }
        
                Sestini.map.addMarkers(markersData);        
            },
        
            setListGroups: function() {
                Sestini.map.on('marker_added', function(marker) {
                    var index = Sestini.map.markers.indexOf(marker);
        
                    El.group.map(function(i, item) {
                        var $item = $(item);
                        var $stateGroup = $item.find('.js--store-locator-state-group');
                        var state = $item.data('storeGroup');
                        
                        if ( state === marker.data.uf ) {
                            $stateGroup.parent().siblings().removeClass('has--items');
                            $stateGroup.parent().addClass('has--items');
        
                            $stateGroup.append("\n    <li class=\"x-store-locator__state-group-item\">\n        <div class=\"x-store-locator__state-group-wrapper js--pan-to-marker\" data-marker-index=\"".concat(index, "\" data-store-id=\"").concat(marker.data.id, "\" data-store-city=\"").concat(marker.data.city, "\">\n            <h3 class=\"x-store-locator__state-group-name\">").concat(marker.data.trade_name, "<span>").concat(marker.data.type, "</span></h3>\n            <a class=\"x-store-locator__state-group-site-link\" href='").concat(marker.data.site, "'>ACESSE O SITE</a>\n            <div class=\"x-store-locator__state-group-site-telephone\">(").concat(marker.data.ddd, ") ").concat(marker.data.phone, "</div>\n            <div class=\"x-store-locator__state-group-site-cellphone ").concat(marker.data.phone2 ? 'is--visible' : 'is--hide', "\">(").concat(marker.data.ddd, ") ").concat(marker.data.phone2, "</div>\n\n            <div class=\"x-store-locator__state-group-site-address\">").concat(marker.data.address, " - ").concat(marker.data.neighborhood, " - ").concat(marker.data.uf, " - ").concat(marker.data.city, " - ").concat(marker.data.cep, "</div>\n        </div>\n    </li>                                 \n"));
                        }
                    });            
        
                    if ( index == Sestini.map.markers.length - 1 ) {
                        Sestini.map.fitZoom();
                        if (Sestini.map.markers.length === 1) {
                            Sestini.map.setZoom(15);
                        }                
                    }            
                });
            },
        }
        
        Sestini.map.setZoom(4);
        Actions.mapActions();        
        Actions.selectActions();
        Actions.setListGroups();        
    },           
};


export default {
    init: Methods.init,
};