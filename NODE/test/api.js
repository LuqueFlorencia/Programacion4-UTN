import { ErrorApi } from './errores.js'

// Fetch a la API: jsonplaceholder

export async function getUsuarios() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let datos = await response.json();
        //console.log("DATOS API: ", datos);
        return datos;
    } catch (error) {
        //console.error(error.message)
        throw new ErrorApi("Ocurrio un error al obtener la información de usuarios de la API.");
    }
}

export async function getPublicaciones() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts')
        let datos = await response.json();
        //console.log("DATOS API: ", datos);
        return datos;
    } catch (error) {
        //console.error(error.message);
        throw new ErrorApi("Ocurrio un error al obtener la información de publicaciones de la API.");
    }
}
