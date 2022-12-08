import { malas__content } from "./sections/malas"
import { mochilas__content } from "./sections/mochilas"
import { bolsas__content } from "./sections/bolsas"
import { acessorios__content } from './sections/acessorios'
import { infantil__content } from "./sections/infantil"
import { juvenil__content } from "./sections/juvenil"
import { executivo__content } from "./sections/executivo"

export const data = [
  {
    title: 'Malas',
    href: "/mala?map=c",
    sections: malas__content
  },
  {
    title: 'Mochilas',
    href: "/mochilas?map=c",
    sections: mochilas__content
  },
  {
    title: 'Bolsas',
    href: "/bolsas?map=c",
    sections: bolsas__content
  },
  {
    title: 'Acessórios',
    href: "/acessorios?map=c",
    sections: acessorios__content
  },
  {
    title: 'Infantil',
    href: "/Infantil?map=specificationFilter_107",
    sections: infantil__content
  },
  {
    title: 'Juvenil',
    href: "/infantil?map=specificationFilter_ ??",
    sections: juvenil__content
  },
  {
    title: 'Executivo',
    href: "/Executiva?map=specificationFilter_ ??",
    sections: executivo__content
  },
]
