import Submenu__Malas from './submenu/malas'
import Submenu__Mochilas from './submenu/mochilas'
import Submenu__Bolsas from './submenu/bolsas'
import Submenu__Acessorios from './submenu/acessorios'
import Submenu__Infantil from './submenu/infantil'
import Submenu__Juvenil from './submenu/juvenil'
import Submenu__Executivo from './submenu/executivo'

const html = String.raw

export function renderMenu() {
  const malaContainerElement = document.querySelector('.x-header-container__bottom-wrapper')
  malaContainerElement.innerHTML = html`
    <nav class="menu">
      <ul class="menu__list">

        <li class="menu__list__item">
          <a class="menu__list__item__link" href="/mala?map=c">Malas</a>
          ${Submenu__Malas()}
        </li>

        <li class=" menu__list__item">
          <a class="menu__list__item__link" href="/mochilas?map=c">Mochilas</a>
          ${Submenu__Mochilas()}
        </li>

        <li class="menu__list__item">
          <a class="menu__list__item__link" href="/bolsas?map=c">Bolsas</a>
          ${Submenu__Bolsas()}
        </li>
        <li class="menu__list__item">
          <a class="menu__list__item__link" href="/acessorios?map=c">Acessórios</a>
          ${Submenu__Acessorios()}
        </li>
        <li class="menu__list__item">
          <a class="menu__list__item__link" href="/infantil?map=specificationFilter_107">Infantil</a>
          ${Submenu__Infantil()}
        </li>
        <li class="menu__list__item">
          <a class="menu__list__item__link" href="/infantil?map=specificationFilter_ ??">Juvenil</a>
          ${Submenu__Juvenil()}
        </li>
        <li class="menu__list__item">
          <a class="menu__list__item__link" href="/Executiva?map=specificationFilter_ ??">Executivo</a>
          ${Submenu__Executivo()}
        </li>
        <li class="menu__list__item menu__list__item--strong">
          <a class="menu__list__item__link" href="/ofertas">Ofertas</a>
        </li>
        <li class="menu__list__item menu__list__item--strong">
          <a class="menu__list__item__link" href="/ative-o-modo-lancamento">Lançamentos</a>
        </li>
        <li class="menu__list__item menu__list__item--strong">
          <a class="menu__list__item__link" href="/sestini-para-empresas">B2B</a>
        </li>
        <li class="menu__list__item menu__list__item--strong">
          <a class="menu__list__item__link" href="/GetMalas">Aluguel de malas</a>
        </li>
      </ul>
    </nav>`
}
