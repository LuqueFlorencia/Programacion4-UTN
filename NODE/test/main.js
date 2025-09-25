/*ENUNCIADO
Una startup quiere desarrollar un sistema de análisis de contenido para una red social ficticia.
La empresa necesita poder:
* Obtener información de usuarios y de sus publicaciones desde una API pública.
* Modelar estos datos en clases de JavaScript que representen de forma clara a los usuarios y a sus publicaciones.
* Implementar un gestor que permita consultar y analizar la información de manera flexible.

Requerimientos
1. Consumo de API
Usar fetch para traer usuarios y publicaciones desde una API pública (por ejemplo https://jsonplaceholder.typicode.com).
Los datos deben procesarse con async/await.
Si la API devuelve error (status diferente de 200), manejarlo con try/catch.

2. Modelado de Clases (diseño libre)
El alumno debe definir qué clases crear, qué propiedades y qué métodos deben tener.
Se espera, como mínimo, representar usuarios y publicaciones de forma clara.
Se debe validar que los objetos tengan todos los campos necesarios (si falta alguno, lanzar un error).

3. Gestión de datos (búsqueda en los objetos obtenidos en el fetch)
Implementar un gestor que permita:
Buscar un usuario por su email.
Listar todas las publicaciones de un usuario dado.
Crear un mapeo donde cada usuario tenga asociadas sus publicaciones.

4. Análisis de datos
Implementar un método que muestre los usuarios con más publicaciones (por ejemplo, el Top 3).
Implementar un método que permita buscar publicaciones que contengan cierta palabra clave en el título o contenido.

5. Entrega esperada
Código modularizado en varios archivos.
Uso de fetch, async/await, manejo de errores.
Clases bien diseñadas y comentadas.
Lógica implementada en el gestor de forma clara.*/


import { getUsuarios, getPublicaciones } from './api.js'
import { Gestor } from './gestor.js'

// Consumo de API
let usuariosApi = await getUsuarios();
let publicacionesApi = await getPublicaciones();

// Gestión de datos (búsqueda en los objetos obtenidos en el fetch)
let gestor = new Gestor();
gestor.agregarUsuarios(usuariosApi);
gestor.agregarPublicacionesPorUsuario(publicacionesApi);

let mail = "Sincere@april.biz";
let usuarioPorMail = gestor.buscarUsuarioPorMail(mail);
//console.log(`Usuario con el email: ${mail}`, usuarioPorMail);

let userID = 1;
let publicacionesPorUsuarioID = gestor.listarPublicacionesPorUsuario(userID);
//console.log(`Publicaciones del UsuarioID: ${userID}`, publicacionesPorUsuarioID);

//gestor.mapearUsuariosPublicaciones();

//Análisis de datos
//gestor.topUsuariosConMasPublicaciones();

let palabra = "reprehenderit";
let posteos = gestor.buscarPublicacionPorPalabra(palabra);
//console.log(`Las publicaciones que incluyen la palabra "${palabra}" en su titulo o cuerpo son: `, posteos);
