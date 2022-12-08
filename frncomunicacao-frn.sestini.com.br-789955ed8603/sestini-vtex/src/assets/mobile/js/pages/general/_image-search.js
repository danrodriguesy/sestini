const Methods = {
    init() {
        Methods.addImageSearchButton()
        Methods.bindUploadButton()
        Methods.bindUploadFile()
        Methods.bindHoverCamButton()
    },
    bindHoverCamButton() {
        $('#cam-icon').click(() => {
            const searchHoverEl = $('.x-header-menu__search-image-search-hover')
            if (!searchHoverEl.hasClass('openned')) {
                searchHoverEl.addClass('openned')
            }
        })
    },
    addImageSearchButton() {
        const template = `
        <div class='x-header-menu__search-image-search'>
            <div id='cam-icon'></div>
            <div class='x-header-menu__search-image-search-hover'>
                <span id='close-search-image'>X</span>
                <div id='cam-icon'></div>
                <h2 class='x-header-menu__search-image-search-hover-title'>Busca por imagem</h2>
                <p class='x-header-menu__search-image-search-hover-text'>Agora você também pode fazer buscas no site usando fotos da sua própria galeria de imagens.</p>
                <button class='x-header-menu__search-image-search-hover-button'>Usar Agora</button>
                <input type='file' id='image-search-file' style='display: none'/>
            </div>
        </div>`
        $('.x-header-menu__search').append(template)
        $('#close-search-image').click(() => $('.x-header-menu__search-image-search-hover').removeClass('openned'))
    },
    bindUploadButton() {
        $('.x-header-menu__search-image-search-hover-button').click(() => $('#image-search-file').click())
    },
    bindUploadFile() {
        const inputFile = $('#image-search-file')
        inputFile.change(e => {
            Methods.setLoading(true)
            if (inputFile.val() != '') {
                var formData = new FormData()
                formData.append('file', $('#image-search-file')[0].files[0])
                $.ajax({
                    url: 'http://sestinidocs.com.br/links/sestini/ecomm-api/upload-image.php?type=image_search',
                    data: formData,
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    crossDomain: true,
                }).done(response => {
                    Methods.searchResults(response)
                })
            }
        })
    },
    searchResults(data) {
        data.results.map((result, index) => {
            fetch(`http://www.sestinidocs.com.br/links/sestini/ecomm-api/search-product.php?search=${result.name}`)
                .then(res => res.text())
                .then(apidata => {
                    if (result.name.toLowerCase() == 'bolsa' || result.name.toLowerCase() == 'malas e malas' || result.name.toLowerCase() == 'mochila') {
                        data.results[index].score = data.results[index].score + apidata.length + 20
                    } else {
                        data.results[index].score += apidata.length
                    }
                })
            if (index == data.results.length - 1) {
                Methods.applyResults(data)
            }
        })
    },
    applyResults(data) {
        const result = data.results.sort((a, b) => {
            if (a.score < b.score) return -1
            if (a.score > b.score) return 1
        })
        const searchTerm = result[0].name == 'Malas e malas' ? 'malas' : result[0].name
        $('.js--search-input').each((i, el) => {
            $(el).val(searchTerm)
        })
        window.history.replaceState(null, null, `#&search-term=${searchTerm}`);
        Methods.setLoading(false)
        Methods.addImageCropped(result[0], data.fileName)
    },
    addImageCropped(data, imageName) {
        const vertices = data.vertices
        const width = parseFloat(vertices[1][0] - vertices[0][0]) * 100
        const height = parseFloat(vertices[2][1] - vertices[0][1]) * 100
        const offsetLeft = parseFloat(vertices[0][0]) * 100
        const offsetTop = parseFloat(vertices[0][1]) * 100
        const box = `width: ${width}%; height: ${height}%; left: ${offsetLeft}%; top: ${offsetTop}%; position: absolute; border: 1px solid red; box-shadow: 0 0 0 9999em rgb(0,0,0, .5)`
        $('#close-search-image').click()
        $('#search-img').remove()
        $('#smarthint-search-result').prepend(`<div id='search-img'>
            <h2> Veja o que encontramos na imagem </h2>
            <div>
                <img src='http://sestinidocs.com.br/links/sestini/ecomm-api/images/${imageName}' alt='Search Image'></img>
                <div style='${box}'></div>
            </div>
        </div>`)
        $('#smarthint-search-close').click(() => $('#search-img').remove())
    },
    setLoading(loading) {
        const template = `<div id='loading-image-search'><span></span> <p>Enviando imagem...</p></div>`
        loading ? $('body').append(template) : $('#loading-image-search').remove()
    }
};

export default {
    init: Methods.init,
};