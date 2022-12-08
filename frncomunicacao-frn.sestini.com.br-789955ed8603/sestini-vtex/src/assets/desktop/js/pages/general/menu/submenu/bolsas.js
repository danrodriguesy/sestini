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
              <a class="submenu__itemLink" href="/bolsa/Bowling?map=c,c">Bowling</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/bowling.jpg" width="250px" height="588px" alt="Categoria Bowling" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Bucket?map=c,c">Bucket</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/bucket.jpg" width="250px" height="588px" alt="Categoria Bucket" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Clutch?map=c,c">Clutch</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/clutch.jpg" width="250px" height="588px" alt="Categoria Clutch" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Cross%20Bag?map=c,c">Cross Bag</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/cross-bag.jpg" width="250px" height="588px" alt="Categoria Cross Bag" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Hobo?map=c,c">Hobo</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/hobo.jpg" width="250px" height="588px" alt="Categoria Hobo" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Maternidade?map=c,c">Maternidade</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/bolsa-Maternidade.jpg" width="250px" height="588px" alt="Categoria Maternidade" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Mini%20Bag?map=c,c">Mini Bag</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/mini-bag.jpg" width="250px" height="588px" alt="Categoria Mini Bag" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Mochila?map=c,c">Mochila</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/bolsa-mochila.jpg" width="250px" height="588px" alt="Categoria Mochila" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Satchel?map=c,c">Satchel</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/satchel.jpg" width="250px" height="588px" alt="Categoria Satchel" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Shopping?map=c,c">Shopping</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/shopping.jpg" width="250px" height="588px" alt="Categoria Shopping" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Tiracolo?map=c,c">Tiracolo</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/bolsa-Tiracolo.jpg" width="250px" height="588px" alt="Categoria Tiracolo" />
              </div>
            </li>
            <li class="submenu__list__item">
              <a class="submenu__itemLink" href="/bolsa/Tote?map=c,c">Tote</a>
              <div class="submenu__imageWrapper">
                <img src="/arquivos/bolsa-Tote.jpg" width="250px" height="588px" alt="Categoria Tote" />
              </div>
            </li>
            <li class="submenu__list__item submenu__list__item--seeAll">
              <a class="submenu__itemLink" href="/bolsa?map=c">Ver todas as Bolsas</a>
            </li>
          </ul>
        </li>
        <!-- [ FIM ] COLUNA 01 -->

        <!-- [ INÍCIO ] COLUNA 02 -->
        <li class="submenu__item submenu__item--col2">

          <div class="submenu__itemWrapper">
            <div class="submenu__item__heading">Por Marca</div>
            <ul class="submenu__list">
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/bolsa/sestini?map=c,b">Sestini</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/bolsa/Fellipe%20Krein?map=c,b">Fellipe Krein</a>
              </li>
            </ul>
          </div>

          <div class="submenu__itemWrapper">
            <div class="submenu__item__heading">Por faixa de preço</div>
            <ul class="submenu__list">
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/bolsa/de-0.01-a-320?map=c,priceFrom">Até R$320,00</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/bolsa/de-320.01-a-370?map=c,priceFrom">De R$320,01 até R$370,00</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/bolsa/de-370.01-a-420?map=c,priceFrom">De R$370,01 até R$420,00</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/bolsa/de-420.01-a-460?map=c,priceFrom">De R$420,01 até R$460,00</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink" href="/bolsa/de-460.01-a-99999?map=c,priceFrom">Acima de R$460,01</a>
              </li>
              <li class="submenu__list__item submenu__list__item--seeAll">
                <a class="submenu__itemLink" href="/bolsa?map=c">Ver todos</a>
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
                  href="/bolsa/Colorido?map=c,specificationFilter_42" title="Filtrar por: Colorido">Colorido</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--yellow"
                  href="/bolsa/Amarelo?map=c,specificationFilter_42" title="Filtrar por: Cor amarelo">Amarelo</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--white"
                  href="/bolsa/Branco?map=c,specificationFilter_42" title="Filtrar por: Cor branca">Branco</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--gray" href="/bolsa/Cinza?map=c,specificationFilter_42"
                  title="Filtrar por: Cor cinza">Cinza</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--black"
                  href="/bolsa/Preto?map=c,specificationFilter_42" title="Filtrar por: Cor preta">Preto</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--purple"
                  href="/bolsa/Roxo?map=c,specificationFilter_42" title="Filtrar por: Cor roxa">Roxo</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--green"
                  href="/bolsa/Verde?map=c,specificationFilter_42" title="Filtrar por: Cor verde">Verde</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--color submenu__itemLink--red"
                  href="/bolsa/Vermelho?map=c,specificationFilter_42" title="Filtrar por: Cor vermelha">Vermelho</a>
              </li>
            </ul>
          </div>
          <!-- [ FIM ] POR TOM DE CORES -->

          <!-- POR MATERIAL -->
          <div class="submenu__itemWrapper">
            <div class="submenu__item__heading submenu__item__heading--lightGray">Por Material</div>
            <ul class="submenu__list submenu__list--row">
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--nylon"
                  href="/bolsa/Nylon?map=c,specificationFilter_72" title="Filtra por: Náilon">Náilon</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--pu"
                  href="/bolsa/Poliuretano?map=c,specificationFilter_72" title="Filtra por: Poliuretano (PU)">PU</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--polyester"
                  href="/bolsa/Poliester?map=c,specificationFilter_72" title="Filtrar por: Poliéster">Poliéster</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--leather"
                  href="/bolsa/Couro?map=c,specificationFilter_72" title="Filtrar por: Couro">Couro</a>
              </li>
            </ul>
          </div>
        </li>

        <!-- [ INÍCIO ] COLUNA 04 -->
        <li class="submenu__item submenu__item--col4">

          <!-- [ INÍCIO ] VEJA TAMBÉM -->
          <div class="submenu__itemWrapper">
            <div class="submenu__item__heading submenu__item__heading--lightGray">Veja também
            </div>
            <ul class="submenu__list submenu__list--row">
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--necessaire" href="/acessorios/Necessaire?map=c,c"
                  title="Filtrar por: Necessaire">Necessaire</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--wallet" href="/acessorios/Carteira?map=c,c"
                  title="Filtrar por: Carteira">Carteira</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--pencil-case-purse" href="/Estojo?map=c"
                  title="Filtrar por: Estojo">Estojo</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--sporting"
                  href="/Sacola/Esportiva?map=c,specificationFilter_106" title="Filtrar por: Esportivo">Esportivo</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--satchel" href="/Sacola?map=c"
                  title="Filtrar por: Sacola">Sacola</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--hard" href="/mala?map=c"
                  title="Filtrar por: Mala">Mala</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--money-belt"
                  href="/acessorios/Pochete/Juvenil?map=c,c,specificationFilter_106"
                  title="Filtrar por: Pochete">Pochete</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--acessories" href="/Acessorios?map=c"
                  title="Filtrar por: Acessórios">Acessórios</a>
              </li>
              <li class="submenu__list__item">
                <a class="submenu__itemLink--withIcon submenu__itemLink--backpack" href="/mochila?map=c"
                  title="Filtrar por: Mochila">Mochila</a>
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
