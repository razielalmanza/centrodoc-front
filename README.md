# Centro de Documentación - Front-end
 
Front-end de la aplicación Centro de Documentación compuesto por una aplicación React.


---
**NOTA**

Este repositorio es una copia de la última versión del repositorio alojado en los servidores de la Filmoteca. 
Esta copia no cuenta con credenciales de acceso, IPs de servidores propios de la institución.
Se anexa en el directorio _evidencias_ el registro de commits del repositorio original.

---
 
## Comenzando 🚀

El front-end de la aplicación está desarrollado en TypeScript con ayuda de React.js y usando Node.Js. 
 
El proyecto se desarrolla a lo largo del 2021 como renovación del [pasado](https://132.247.164.43/filmo/centroDocumentacion) Centro de Documentación.
 
En este caso React se usa en combinación con TypeScript, reforzando al framework en su robustez y agilidad de desarrollo; ofrece una experiencia mucho más amigable y útil en ambientes de desarrollo, gracias a su naturaleza de un lenguaje fuertemente tipado.
 
## Pre-requisitos 📋
 
Herramientas necesarias para el desarrollo
 
 - [Node.js v12.16.2](https://nodejs.org/de/blog/release/v12.16.2/)
 - [git](https://git-scm.com/downloads) - Si se desarrolla en ambiente Windows son necesarios estos comandos básicos de shell. Ver [Instalación de Git](https://dgac-conti.atlassian.net/l/c/SeGVPwCY)
 - [yarn v1.22.4](https://classic.yarnpkg.com/en/docs/install#windows-stable)
 
## Instalación
 
- Instalar Node.js.
- Instalar yarn.
- Clonar el repositorio

```bash
git@safe-holder/centrodoc-front.git
```

- Ejecutar el comando por primera vez instalará todas las dependencias necesarias. 
 
```bash 
yarn dev  
```
 
## Ejecución
 
Basta con usar el comando: 
 
``` 
yarn dev  
```
 
Éste mantendrá la ejecución atenta a los cambios realizados para modificar mientras se escribe el código.
 
### Variables de entorno 
 
Dentro del archivo **_.env_** se definen las siguientes variables
 
- **_REACT_APP_LOCAL_SERVER_**: la dirección del servidor local.
- **_REACT_APP_LOCAL_NETWORK_SERVER_**: la dirección del servidor en red. 
 
- **_REACT_APP_MIN_SIZE_SEARCH_** entero con el número de carácteres mínimos para realizar una búsqueda en el sistema,
 
## Estructura del proyecto 📂
 
- 📂 **docs**
 Contiene los varios documentos donde se detalla el avance del progreso y futuros documentos que proporcionen información para la plataforma.
 
- 📂 **public**
 Contiene los archivos necesarios para que el sitio funcione correctamente, como un ícono, logo y el manifiesto.
 
- 📂 **src/api**
 Contiene todos los archivos con las llamadas al API del back-end del Centro de Documentación, así como la configuración en general para la conexión de las mismas.
 
- 📂 **src/components**
 Contiene todos los componentes de React usados, la estructura consiste en un directorio por componente, donde se podrá alojar el componente escrito en TypeScript y su hoja de estilos correspondiente.
 
- 📂 **src/context**
 Contiene todos los Contextos de React utilizados en el proyecto, se asigna un archivo por cada Contexto.
 
- 📂 **src/pages**
 Contiene todas las vistas principales, divididas en dos tipos: items y tools. Además de las vistas principales, tales como Inicio de sesión, Registro y menú principal.
 
- 📂 **src/resources**
Contiene todos los recursos necesarios para el funcionamiento del sitio, tales como imágenes, y listas de elementos para mostrar en pantalla.
 
- 📂 **src/types** 
Contiene todos los archivos que especifican los tipos que utilizaremos, así como las clases necesarias.
 
- 📂 **src/utils**
Contiene archivos con diversas funcionalidades, como JWT y funciones misceláneas.
 
## Despliegue
 
Pendiente.
 
---
 
## Autores ✒️
 
- **Raziel Almanza Ibarra** - <razielalmanza@ciencias.unam.mx>
