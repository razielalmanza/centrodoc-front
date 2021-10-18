import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import TitleIcon from '@material-ui/icons/Title';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import FaceIcon from '@material-ui/icons/Face';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PhotoIcon from '@material-ui/icons/Photo';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import MovieIcon from '@material-ui/icons/Movie';
import { urlPathItem } from '../utils';

interface PropsLinks{
  title: string;
  redirect: string;
  icon: any;
}

export const linkHome: PropsLinks = {
  title : "Menú Principal",
  redirect: "/",
  icon: <HomeIcon/>
}

const linkPersonas: PropsLinks = {
  title : "Personas",
  redirect: `${urlPathItem.PERSONAS}/menu` ,
  icon: <FaceIcon/>
}

const linkInterpretes: PropsLinks = {
  title : "Interpretres",
  redirect: `${urlPathItem.INTERP}/menu`,
  icon: <PeopleIcon/>
}

const linkTitulos: PropsLinks = {
  title : "Títulos",
  redirect: `${urlPathItem.TITULOS}/menu` ,
  icon: <TitleIcon/>
}

const linkCatValues: PropsLinks = {
  title : "Cat Values",
  redirect: `${urlPathItem.CATVALUES}/menu` ,
  icon: <SortByAlphaIcon/>
}

const linkPersonalidades: PropsLinks = {
  title : "Personalidades",
  redirect: `${urlPathItem.PERSON}/menu` ,
  icon: <EmojiPeopleIcon/>
}

const linkStills: PropsLinks = {
  title : "Stills",
  redirect: `${urlPathItem.STILLS}/menu` ,
  icon: <PhotoIcon/>
}

const linkFomo: PropsLinks = {
  title : "Fotomontajes",
  redirect: `${urlPathItem.FOMO}/menu` ,
  icon: <PhotoLibraryIcon/>
}

const linkFoto: PropsLinks = {
  title : "Foto Rodajes",
  redirect: `${urlPathItem.FOTO}/menu` ,
  icon: <AddLocationIcon/>
}

const linkCartel: PropsLinks = {
  title : "Carteles",
  redirect: `${urlPathItem.CARTEL}/menu` ,
  icon: <WallpaperIcon/>
}

const linkVhsDvd: PropsLinks = {
  title : "VHS / DVD / BR",
  redirect: `${urlPathItem.VHSDVD}/menu`,
  icon: <MovieIcon/>
}

export const listTools = [linkPersonas, linkTitulos, linkPersonalidades, linkCatValues, linkInterpretes];
export const listItems = [linkStills, linkFomo, linkFoto, linkCartel, linkVhsDvd];