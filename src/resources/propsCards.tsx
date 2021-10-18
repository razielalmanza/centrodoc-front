import { PropsCard } from "../components/Card/Card"
import { urlPathItem } from "../utils"

const cardPersonas: PropsCard = {
  title: "Personas",
  secondaryText: "Administración de Personas",
  imageUrl: "https://tvazteca.brightspotcdn.com/dims4/default/8905fa4/2147483647/strip/true/crop/945x590+0+0/resize/968x604!/format/jpg/quality/80/?url=https%3A%2F%2Ftvazteca.brightspotcdn.com%2Fb0%2F94%2F27f1a31a14a1ac28436467c43d62%2Ffotoespecial-2244145.jpg",
  redirect: `${urlPathItem.PERSONAS}/menu` 
}

const cardInterpretes: PropsCard = {
  title: "Interpretres",
  secondaryText: "Administración de Interpretes",
  imageUrl: "https://shorthand-social.imgix.net/prod/story/uyUIu5Badj/media/f173e1c0dbb011e7a61c7318cab86c92/original.jpg",
  redirect: `${urlPathItem.INTERP}/menu` ,
}

const cardTitulos: PropsCard = {
  title: "Títulos",
  secondaryText : "Administración de Títulos",
  imageUrl: "https://i.pinimg.com/originals/34/24/ec/3424ec25a0722e47a78bb3666a18937d.jpg",
  redirect: `${urlPathItem.TITULOS}/menu` 
}

const cardCatValues: PropsCard = {
  title: "Cat Values",
  secondaryText: "Administración de los cat values",
  imageUrl: "https://i0.wp.com/entrefans.com/wp-content/uploads/Epoca-de-Oro-Cine-Mexicano.jpg",
  redirect: `${urlPathItem.CATVALUES}/menu` 
}

const cardPersonalidades: PropsCard = {
  title: "Personalidades",
  secondaryText: "Administración de Personalidades",
  imageUrl: "http://2.bp.blogspot.com/_gEJXL4IZ22U/TDedAZJvqUI/AAAAAAAAAF0/b17f8ov_62s/s1600/2s9oklv.jpg",
  redirect: `${urlPathItem.PERSON}/menu` ,
}

const cardStills: PropsCard = {
  title: "Stills",
  secondaryText: "Administración de Stills",
  imageUrl: "https://c.stocksy.com/a/vZC800/z9/1954979.jpg",
  redirect: `${urlPathItem.STILLS}/menu` ,
  item: true,
}

const cardsFomo: PropsCard = {
  title: "Fotomontajes",
  secondaryText: "Administración de Fotomontajes",
  imageUrl: "https://www.mypress.mx/img/articulos/webp/7212.webp",
  redirect: `${urlPathItem.FOMO}/menu` ,
  item: true,
}

const cardsFoto: PropsCard = {
  title: "Foto Rodajes",
  secondaryText: "Administración de Foto Rodajes",
  imageUrl: "https://lagazzettadf.com/wp-content/uploads//2013/06/miguel_morayta_muerte-movil-700x468.jpg",
  redirect: `${urlPathItem.FOTO}/menu` ,
  item: true,
}

const cardsCartel: PropsCard = {
  title: "Carteles",
  secondaryText: "Administración de Carteles",
  imageUrl: "https://i.pinimg.com/originals/16/35/71/163571ea9be52ab5bb2af0302a595bf2.jpg",
  redirect: `${urlPathItem.CARTEL}/menu` ,
  item: true,
}

const cardsVhsDvd: PropsCard = {
  title: "VHS / DVD",
  secondaryText: "Administración de VHS / DVD / BR",
  imageUrl: "https://1.bp.blogspot.com/-N3IKmspmifs/XcHCMNnw8sI/AAAAAAAASZI/zNArpHgtJRgK0AjIxBb4JD7Zjr0oUHUqwCLcBGAsYHQ/s1600/video_store_era%2B%25281%2529.jpg",
  redirect: `${urlPathItem.VHSDVD}/menu` ,
  item: true,
}

export const cardsListTools: PropsCard[] = [cardPersonas, cardInterpretes, cardTitulos, cardPersonalidades, cardCatValues];
export const cardListItems: PropsCard[] = [cardStills, cardsFomo, cardsFoto, cardsCartel, cardsVhsDvd];