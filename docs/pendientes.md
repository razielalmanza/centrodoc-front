### Pendientes funcionales:
- Expulsar esultados de búsqueda en pdf (confirmar que es pdf con felipe).
- Busqueda para items
- Agregar los permisos pendientes: staff?
- Ver qué onda con año fin (titulos/agrega - busca)
- Vhs / dvd: ver qué onda con 'audio' field de la base

### Pendientes migración
- Una vez migradas: Definir qué no es nulo (en tablas item hijo, cartec etc.) ya después. Establecer en modelo, para que els cript siga funcionando not null en posibles futuras migraciones.

### Pendientes back end


### Pendientes refactor
- Hacer un componente: 'Switch' que reciba los objetos (permisos y elemntos) a mostar: puede que sea muy confuso, tal vez.


### Pendientes estilos
- Cambiar las imágenes del inicio por elementos locales.
- Falta dar estilo a ListDetails.tsx

### DONE
- YA: Mostar bien las relaciones, el fondo es negro del componente??
- YAPreparar con un useEffect(,[]) al llegar a Detalles y de ahí solo mostrar todo. Lista de lista con elementos
- YA: Hacer Editar
- Vhs / dvd: elemento duración en tiempo.

- YA: Refacotr login en componente

- YA:Refactor componente detalles
- YA: Hacer un notfound con props para que diga el error. y el link de vuelta. 
- Hacer un botón de editar en los detalles de cada item, por ejemplo: Persoanlidades tiene item y su propio contenido (cd_personalidades).
  EN la pantalla de mostrar detalles de Personalidades, el bitón eidtar, editar su cintendio, y por cada item relacionado, se agrega un botón ara editar ese item. Ese botón puede ser un enlace a /item/edita/id O usar el tipo de item que es y usarlo en el url: si es tipo cartel sería 
  /cartel/edita/id
- Hacer cat Values paginado, para evitar carga innecesaria.
- Busqueda paginada: https://material-ui.com/es/components/pagination/
- Agregar búsuqeda paginada a busquedas de interpretes, personalidades, etc.
- Todos los onsubmit. dejar los obSUbmit actuales pero, en cada uno llamar algo que haga la request, la url, todo. y ahorrar todos los casos de posible error repetidos. YA
- Faltan pantallas de asocia.
- Falta mostrar el rol en detalles de personas.
- asiganrle un permiso a todas las acciones de dar de baja (tal vez, porque desde backend ya se maneja).
- PRIORITARIO: Crear /item/ para editar los detalles de cada item, ya sea cartel etc. la otra opción es que en /cartel/edita incluya esos datos. queda por ver. APlica para todos los elementos, pues todos tienen un cd_item.
- A cada item en sus detalles (/item/detalles/:id) dar un botón que permita asociar atodsas sus entidades posibles. y no dejar aisaldas las pantallas de asocia (pues el idcd_item no debería saberlo el usuario). -> esto aplica a los tools
- Asociar/des titulos
- Actualizar el api de postman con los endpoints de as/desasociar titulos a items
- Terminar los pendientes rel. a asocia
- Vhs / dvd: lista de paises
- Drop down con lista de paises (titulos/agrega)

### Cómo avanzará:
- Terminar tools
- Modificar catvalues, regresar lista no texto plano
- Hacer paginada las busquedas de tools en backend
- Busqueda paginada en front
- Solo hasta este punto, Hacer los asocia
