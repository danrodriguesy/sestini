const Methods = {
    init() {
        Methods.getInstagram()
    },

    getInstagram() {
        let endpoint = `http://sestinidocs.com.br/links/sestini/ses-ig/getMasterData.php`;
        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                Methods.showInstagram(data)
                Methods.setProfileImage()
            })
    },

    setProfileImage() {
        $('#user-photo').attr('src', 'https://sestini.vteximg.com.br/arquivos/profile-ig-picture.jpg')
    },

    showInstagram(data) {
        data.reverse().map((item) => {
            switch (item.media_type) {
                case "IMAGE":
                    $('#ig-images').append(`<a href='${item.permalink}' rel="noreferrer" target='_blank' title='${item.caption}'><img class='lozad' src='${item.media_url}' alt='Instagram' /></a>`)
                    break;
                case "CAROUSEL_ALBUM":
                    $('#ig-images').append(`<a href='${item.permalink}' rel="noreferrer" target='_blank' title='${item.caption}'><img class='lozad' src='${item.media_url}' alt='Instagram' /></a>`)
                    break;
                case "VIDEO":
                    $('#ig-images').append(`<a href='${item.permalink}' rel="noreferrer" target='_blank' title='${item.caption}'><video class='lozad' loop="true" autoplay="autoplay" muted><source src="${item.media_url}" type="video/mp4"></video></a>`)
            }
        })
        setTimeout(Methods.playVideos, 2500)
        Methods.initLazy()
        },
        initLazy() {
            lozad('.lozad', {
            loaded: function (el) {
                el.classList.add('loaded');
            }
            }
            ).observe()
    },

    playVideos() {
        $("video").each((i, el) => {
            el.muted = true
            el.loop = true
            el.play()
        });
    }
};

export default {
    init: Methods.init,
};

// CAMINHO DA API DO INSTAGRAM INSTAGRAM = http://sestinidocs.com.br/links/sestini/ses-ig/