const http = require('http');

const slugifyText = str => {
  str = str
    .replace(/^\s+|\s+$/g, "") // trim
    .toLowerCase()
    .replace(/\./g, "-") // Replace a dot for a -
    .replace(/\*/g, "-") // Replace a * for a -
    .replace(/\+/g, "-"); // Replace a + for a -

  // Remove accents, swap ñ for n, etc
  const from = "àáäâãèéëêìíïîòóöôõùúüûýÿñç·/_,:;";
  const to = "aaaaaeeeeiiiiooooouuuuyync------";

  for (let i = 0, len = from.length; i < len; i += 1) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-") // Collapse whitespace and replace by -
    .replace(/-+/g, "-"); // Collapse dashes

  if (str.charAt(0) === "-") str = str.substr(1);
  if (str.charAt(str.length - 1) === "-") str = str.substr(0, str.length - 1);

  return str;
};

let items = [
  'Abertura Vertical',
  'Anti-Furto',
  'Bolso de Acesso Rápido',
  'Bolso Escondido',
  'Bolso Externo com Zíper',
  'Bolso Feltrado',
  'Bolso Interno',
  'Bolso Interno com Zíper',
  'Brinde Incluso',
  'Cadeado Fixo',
  'Cadeado TSA',
  'Carrinho Embutido',
  'Cintas Internas para Roupas',
  'Compartimento para Alimentos',
  'Conector USB',
  'Costas Espumadas',
  'Divisórias Internas',
  'Duplo Cadeado',
  'Entra Bordo',
  'Expansível',
  'Fixador de Cadeado',
  'Kit Lanche',
  'Organizador',
  'Pasta Portifólio A-Z',
  'Pés e Rodas Extensoras',
  'Porta Cartão',
  'Porta Celular',
  'Porta Lenço Umidecido',
  'Porta Mamadeira',
  'Porta Notebook',
  'Porta Tablet',
  'Porta Tênis',
  'Super Leve',
  'Térmica',
  'Fechadura Com Segredo TSA',
  'Alça de Mão Emborrachada',
  'Compartimento para Laptop',
  'Identificador',
  'Roda com Trava',
  'Alça Lateral',
  'Bolso Interno com Rede',
  'Sistema Hug',
  'Bolso Frontal com Zíper',
  'Rodas Retráteis',
  'Limitador de Abertura',
  'Alça Transversal Removível',
  'Bolso Interno em Rede',
  'Alça Carona',
  'Espelho Interno',
];


let output = items.map(p => {
  let name = slugifyText(p);
  let file = 'icon-' + name;

  http.get(
    `http://sestini.vteximg.com.br/arquivos/${file}.png`,
    res => {

        console.log(
          [p,
            file + ".png",
            res.statusCode === 200 ? "OK" : "Não existe"
          ]
          .join(
            " | "
          )
        );

        // console.log({
        //     name: p,
        //     file: file,
        //     status: res.statusCode === 200 ? 'OK' : 'Error'
        // })
    }
  );

});
