import template from "lodash.template";
import { ifElse } from "ramda";
import { methods } from "underscore";

const Methods = {
    init() {
        Methods.setGA();
        setTimeout(() => {
            Methods.updateOrderImage();
            Methods.addLabelsTable();
            Methods.mainTitle();
            //Methods.EbitBanner2();
            Methods.addFavicon()
     
            dataLayer[4].transactionPaymentType[0].paymentSystemName == 'Boleto Bancário' && Methods.getBarcode()
        }, 2000);
    },
    getBarcode() {
        const orderId = `${dataLayer[4].transactionId}-01`
        fetch(`https://sestinidocs.com.br/links/sestini/ecomm-api/get-barcode.php?orderId=${orderId}`)
            .then(res => res.json())
            .then(data => {
                const barcode = data[0]
                Methods.setCopyPasteBarcode(barcode)
            })
    },
    setCopyPasteBarcode(barcode) {
        const insertElement = $(`#app-top > div > div.cconf-bank-invoice-data.pt3.dn.db-ns > div.cconf-bank-invoice-data__top.flex-ns.justify-between.items-center.mb3 > h4`)
        const template = `<button class='copy-paste-btn'><div id='copy-icon'></div>Copiar Linha Digitável</button>`
        insertElement.after(template)
        $('.copy-paste-btn').click(() => {
            navigator.clipboard.writeText(barcode).then(() => {
                $('.copy-paste-btn').html(`<div id='copy-icon'></div>Copiado com sucesso!`)
                $('.copy-paste-btn').css('background', '#137752')
                setTimeout(() => {
                    $('.copy-paste-btn').html(`<div id='copy-icon'></div>Copiar Linha Digitável`)
                    $('.copy-paste-btn').css('background', 'rgb(23, 98, 179)')
                }, 2000)
            })
        })
    },

    //EbitBanner2() {

     //$(".x-footer").append(`<div><a id="bannerEbit"></a></div>`);
        
    //},
    
    addLabelsTable() {
        $('.cconf-product-table').prepend(`
      <thead>
        <tr>
          <td>Produto</td>
          <td>Quantidade</td>
          <td>Valor</td>
        </tr>
      </thead>`)
    },
    addFavicon() {
        var link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = 'https://sestini.vteximg.com.br/arquivos/favicon-sestini.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    mainTitle() {
        document.title = 'Sestini - Pedido confirmado';
    },
    updateOrderImage() {
        const allProductImages = document.querySelectorAll('.cconf-product img');
        [...allProductImages].map((image) => {
            const currentSrc = image.getAttribute('src');
            const newImage = currentSrc.replace(/-70-70/gi, '-125-125');
            image.setAttribute('src', newImage);
        });
    },
    setGA() {
        var orderId = window.location.search.split('=')[1];
        if (window.localStorage.getItem('order') !== orderId) {
            window.localStorage.setItem('order', orderId);
            dataLayer.push({
                isInGA: true
            });
        } else {
            // console.log('Já existe no G.A')
        }
    }
};


export default {
    init: Methods.init,
};