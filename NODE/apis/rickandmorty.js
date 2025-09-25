import { ErrorApi, ParametroError } from './error.js'

export async function obtenerPersonajes(id = null, name = null) {
    const urlBase = 'https://rickandmortyapi.com/api/character';

    if (id != null){
        if (typeof id === 'number'){
            id = Number(id);
            if (!Number.isInteger(id) || id <= 0){
                throw new ParametroError("El id debe ser un entero positivo");
            }
        } else {
            throw new ParametroError("El id debe ser un numero");
        }
    } else if (name != null){
        if (typeof name !== 'string' || name.trim() === ''){
            throw new ParametroError("El nombre debe ser un string no vacio");
        }
        name = name.trim();
    }

    let url = urlBase;
    if (id != null){
        url = `${urlBase}/${id}`
    } else if (name != null) {
        url = `${urlBase}/?name=${name}`
    }

    try {
        let res = await fetch(url);
        let data = await res.json();
        //console.log(data)
        return data;
    } catch (error) {
        //console.error(error.message);
        throw new ErrorApi();
    }
        
}