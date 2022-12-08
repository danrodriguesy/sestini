const html = String.raw

export default function () {
  return html`
    <div class=submenuWrapper>
      <ul class="submenu">

        <!-- [ INICIO ] COLUNA 01 -->
        <li class="submenu__item submenu__item--col1">
          <div class="submenu__item__heading">Categoria</div>
          <ul class="submenu__list">
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Balanca?map=c,c">Balança</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/Balança.jpg" width="250px" height="588px" alt="Categoria Balança" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Cadeados?map=c,c">Cadeados</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/CADEADO2.jpg" width="250px" height="588px" alt="Categoria Cadeados" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Capa?map=c,c">Capa</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/Capa-de-mala.jpg" width="250px" height="588px" alt="Categoria Capa" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Carteira?map=c,c">Carteira</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/Carteira.jpg" width="250px" height="588px" alt="Categoria Carteira" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Cinta%20de%20Segurança?map=c,c">Cinta de Segurança</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/CINTA-MALA.jpg" width="250px" height="588px" alt="Categoria Cinta de Segurança" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Kit%20Viagem?map=c,c">Kit Viagem</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/KIT-VIAGEM.jpg" width="250px" height="588px" alt="Categoria Kit Viagem" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Necessaire?map=c,c">Necessaire</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/Necessaire.jpg" width="250px" height="588px" alt="Categoria Necessaire" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Pochete?map=c,c">Pochete</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/Pochete.jpg" width="250px" height="588px" alt="Categoria Pochete" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Porta%20Dolar?map=c,c">Porta Dólar</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/Porta-Dolar.jpg" width="250px" height="588px" alt="Categoria Porta Dólar" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Protetor%20Auricular?map=c,c">Protetor Auricular</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/PROTETOR-AURICULAR.jpg" width="250px" height="588px"
                  alt="Categoria Protetor Auricular" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Tag%20de%20mala?map=c,c">Tag de Mala</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/TAG-DE-MALA.jpg" width="250px" height="588px" alt="Categoria Tag de Mala" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/acessorios/Travesseiro?map=c">Travesseiro</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/Travesseiro.jpg" width="250px" height="588px" alt="Categoria Travesseiro" />
              </div>
            </li>
            <li class="submenu__list__item submenu__list__item--seeAll">
              <a class="submenu__itemLink" href="/acessorios?map=c">Ver todos os Acessórios</a>
            </li>
          </ul>
        </li>
        <!-- [ FIM ] COLUNA 01 -->

        <!-- [ INÍCIO ] COLUNA 02 -->
        <li class="submenu__item submenu__item--col2">
          <div class="submenu__itemWrapper">
            <div class="submenu__item__heading">Por faixa de preço</div>
            <ul class="submenu__list">
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/acessorios/de-0.01-a-40?map=c,priceFrom">Até R$40,00</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/acessorios/de-40.01-a-60?map=c,priceFrom">De R$40,01 até R$60,00</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/acessorios/de-60.01-a-80?map=c,priceFrom">De R$60,01 até R$80,00</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/acessorios/de-80.01-a-100?map=c,priceFrom">De R$80,01 até R$100,00</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/acessorios/de-100.01-a-99999?map=c,priceFrom">Acima de R$100,01</a>
              </li>
              <li class="submenu__list__item submenu__list__item--seeAll">
                <a class="submenu__itemLink" href="/acessorios?map=c">Ver todos</a>
              </li>
            </ul>

          </div>
        </li>
        <!-- [ FIM ] COLUNA 02 -->

        <!-- [ INÍCIO ] COLUNA 03 -->
        <li class="submenu__item submenu__item--col3">

          <!--[ INÍCIO ] POR TOM DE CORES -->
          <div class="submenu__itemWrapper">
            <div class="submenu__item__heading submenu__item__heading--lightGray">Por tom de cores</div>
            <ul class="submenu__list submenu__list--colors submenu__list--row">
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--colored"
                  href="/acessorios/Colorido?map=c,specificationFilter_42" title="Filtrar por: Colorido">Colorido</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--yellow"
                  href="/acessorios/Amarelo?map=c,specificationFilter_42" title="Filtrar por: Cor amarelo">Amarelo</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--blue"
                  href="/acessorios/Azul?map=c,specificationFilter_42" title="Filtrar por: Cor azul">Azul</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--white"
                  href="/acessorios/Branco?map=c,specificationFilter_42" title="Filtrar por: Cor branca">Branco</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--gray"
                  href="/acessorios/Cinza?map=c,specificationFilter_42" title="Filtrar por: Cor cinza">Cinza</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--orange"
                  href="/acessorios/Laranja?map=c,specificationFilter_42" title="Filtrar por: Cor laranja">Laranja</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--brown"
                  href="/acessorios/Marrom?map=c,specificationFilter_42" title="Filtrar por: Cor marrom">Marrom</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--black"
                  href="/acessorios/Preto?map=c,specificationFilter_42" title="Filtrar por: Cor preta">Preto</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--pink"
                  href="/acessorios/Rosa?map=c,specificationFilter_42" title="Filtrar por: Cor rosa">Rosa</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--purple"
                  href="/acessorios/Roxo?map=c,specificationFilter_42" title="Filtrar por: Cor roxo">Roxo</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--green"
                  href="/acessorios/Verde?map=c,specificationFilter_42" title="Filtrar por: Cor verde">Verde</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--red"
                  href="/acessorios/Vermelho?map=c,specificationFilter_42" title="Filtrar por: Cor vermelha">Vermelho</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--wine"
                  href="/acessorios/Vinho?map=c,specificationFilter_42" title="Filtrar por: Cor vinho">Vinho</a>
              </li>
            </ul>

          </div>
          <!-- [ FIM ] POR TOM DE CORES -->

          <!-- POR GÊNERO -->
          <div class="submenu__itemWrapper">
            <div class="submenu__item__heading submenu__item__heading--material submenu__item__heading--lightGray">Por
              Gênero
            </div>
            <ul class="submenu__list submenu__list--row">
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--gender submenu__itemLink--female"
                  href="/acessorios/Feminino?map=c,specificationFilter_67" title="Filtrar por: Para Ela">Para Ela</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--gender submenu__itemLink--male"
                  href="/acessorios/Masculino?map=c,specificationFilter_67" title="Filtrar por: Para Ele">Para Ele</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--gender submenu__itemLink--yourWay-acessories"
                  href="/acessorios/Do%20seu%20jeito?map=c,specificationFilter_67" title="Filtrar por: Para Todos">Para
                  Todos</a>
              </li>
            </ul>
          </div>

        </li>
        <!-- [ FIM ] COLUNA 03 -->

        <!-- [ INÍCIO ] COLUNA 04 -->
        <li class="submenu__item submenu__item--col4">

          <!-- [ INÍCIO ] VEJA TAMBÉM -->
          <div class="submenu__itemWrapper">
            <div class="submenu__item__heading submenu__item__heading--lightGray">Veja também
            </div>
            <ul class="submenu__list submenu__list--row">
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--purses" href="/bolsa?map=c"
                  title="Filtrar por: Bolsas">Bolsas</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--hard" href="/mala?map=c"
                  title="Filtrar por: Malas">Malas</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--backpack" href="/mochila?map=c"
                  title="Filtrar por: Mochilas">Mochilas</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--necessaire" href="/acessorios/Necessaire?map=c,c"
                  title="Filtrar por: Necessaire">Necessaire</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--money-belt"
                  href="/acessorios/Pochete/Juvenil?map=c,c,specificationFilter_106"
                  title="Filtrar por: Pochete">Pochete</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--fichario" href="/acessorios/Fichario?map=c,c"
                  title="Filtrar por: Fichário">Fichário</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--satchel" href="/Sacola?map=c"
                  title="Filtrar por: Sacola">Sacola</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--little-bags" href="/mala/escolar?map=c,c"
                  title="Filtrar por: Malinha">Malinha</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--maternity" href="/bolsa/Maternidade?map=c,c"
                  title="Filtrar por: Maternidade">Maternidade</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--moch-with-wheels" href="/bolsa/Maternidade?map=c,c"
                  title="Filtrar por: Mochila com rodas">Mochila com rodas</a>
              </li>
            </ul>

          </div>
          <!-- [ FIM ] POR TIPO DE CADEADO  -->
        </li>
        <!-- [ FIM ] COLUNA 04 -->
      </ul>
    </div>
  `
}
