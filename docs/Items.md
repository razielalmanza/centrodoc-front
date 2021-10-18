Problema: Un elemento vhs/dvd ya no se compone únicamente de una tabla.

Idea:
 Definir qué se puede buscar de un vhs /dvd (por ejemplo).

Trivial y ya listo en back-end:
  Buscar en las caracteristicas de la tabla vhs/dvd y de la entidad padre (cd item).

Reto:
  Ofrecer una búsuqeda que permita localizar vhs/ dvd por las siguientes categorias:
  - por su título.
  - por sus personas
  - por sus interpretes
  
Posibles soluciones:
- 1: Ofrecer tres botones al acceder la búsuqeda: 
  - Buscar por 
  - su título.
  - por sus personas
  - por sus interpretes

  Cada uno hace una búsuqeda separada y aisalada de la otra. Se enfoca en solo dar resultados de vhs/ dvds con respecto a las opciones. 

  Con la posbilidad que cada búsuqeda ofrezca bucar los campos ya mencionados (triviales).

  Sería más simple pero pesado.

- 2: Ofrecer una búsuqeeda que haga al usuario transparente todo: que elijan si quieren personas, ítulos, intérpretes, etc.

Esto sería más costoso pues dentro de una mismas vista se usaría tal vez una sola petición (?) . Haría mas complicado el backend

Idea. Peticion forma: vhs:dvd/busca/
{
  interpretes: [...],
  titulos: [...], Problema: un título es un un objeto, aún más complciado enlistarlo. idea: restringit qyé tanto puede buscar, año y título.
  persona: [...],
  ... // acá iría el resto de petición tirvial.
}

Esto en backend sería epsado y bastante complciado, reto: desarrollar.

---
Implementación:

Si busca por título/interprete/persona:
Crear una búsqueda con esta implementación.
- Encontrar todas las coincidencias del título mencionado (cd_cat_titulos)
  - Si no hya coincidencias. Acaba
  - Obtener la lista cd_items ligados a las coincidencias.
  - Con la lista de cd_items, filtramos según colocación y parametros del item a buscar. 
  - obtenemos los items de vhs_dvd y de ahí filtramos con los parámetros de la búsqueda de vhs_dvd
IDEA: para darle al usuario la habilidad de introducir por título por personas, etc (y no restringir a solo títulos, etc), se puede repetri la búsqueda y acumular los resultados. Hacer una búsuqeeda con intérpretes, una con títulos, etc y juntar los resultados.

Si no introduce título/interprete/persona:
Se usa la búsqueda que ya se tiene implementada.



----------
Al agregar un item (vhs, carteles, etc) se debe dar opciones a agregar títulos, personas e interpretes) Agregar una nota.