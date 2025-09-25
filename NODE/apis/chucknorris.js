import { ErrorApi } from './error.js'

export async function obtenerChistesRandom() {
    try {
        let res = await fetch('https://api.chucknorris.io/jokes/random');
        let data = await res.json()
        //console.log(data);
        return data;
    }
    catch (error) {
        //console.error(error.message);
        throw new ErrorApi(error.message);
    }
}

export async function obtenerCategorias() {
    try {
        let res = await fetch('https://api.chucknorris.io/jokes/categories');
        let data = await res.json();
        //console.log(data);
        return data;
    } 
    catch (error) {
        //console.error(error.message);
        throw new ErrorApi(error.message)
    }
}
