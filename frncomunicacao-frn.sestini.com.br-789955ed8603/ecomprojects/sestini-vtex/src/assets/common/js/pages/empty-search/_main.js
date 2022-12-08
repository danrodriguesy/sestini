import CacheSelector from './__cache-selectors';

const { searchedText } = CacheSelector;

const Methods = {
    init() {
        Methods.insertSearchInfo();
    },
    insertSearchInfo() {
        const term = Sestini.globalHelpers.getUrlParameter('ft');

        if (term) {
            [...searchedText].map((el) => {
                el.innerHTML = term;
            });
        }

        Methods.getEmptySearchData(term)
    },

    getEmptySearchData(searchTerm) {
        // OS NAME
        var OSName = "Unknown";
        if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) OSName = "Windows 10";
        if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName = "Windows 8";
        if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName = "Windows 7";
        if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName = "Windows Vista";
        if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName = "Windows XP";
        if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName = "Windows 2000";
        if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
        if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
        if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
        // BROWSER NAME
        var browserName = "Unknown"
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) browserName = 'Opera';
        if (navigator.userAgent.indexOf("Chrome") != -1) browserName = 'Chrome';
        if (navigator.userAgent.indexOf("Safari") != -1) browserName = 'Safari';
        if (navigator.userAgent.indexOf("Firefox") != -1) browserName = 'Firefox';
        if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) browserName = 'IE';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}%2C${longitude}&language=en%27&key=AIzaSyDkQpl8zs9YmQtVXyHPQ90QoehJNVicCy8`)
                    .then(res => res.json())
                    .then(data => {
                        const address = data.results[6].formatted_address
                        Methods.saveEmptySearchUserData(searchTerm, OSName, browserName, address)
                    })
            });
        } else {
            Methods.saveEmptySearchUserData(searchTerm, OSName, browserName, '')
        }
    },
    saveEmptySearchUserData(searchTerm, OSName, browserName, address) {
        const urlParams = encodeURI(`searchTerm=${searchTerm}&os=${OSName}&browser=${browserName}&address=${address}`)
        fetch(`http://sestinidocs.com.br/links/sestini/ecomm-api/save-emptysearch-data.php?${urlParams}`)
    },
};

export default {
    init: Methods.init,
};