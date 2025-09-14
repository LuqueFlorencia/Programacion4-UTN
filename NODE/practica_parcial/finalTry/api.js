import { ResponseApiError } from "./errores.js";

// Consumo de API publica para obtener data de usuarios
export async function obtenerUsuarios(){
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error en la API: ${error.message}`);
        return [];
    }
}

// Consumo de API publica para crear un nuevo usuario
export async function crearUsuario(){
    const nuevo = {
        nombre: "Florencia Luque",
        username: "fluque",
        email: "flor@gmail.com"
    }

    try {
        const res = await fetch ('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(nuevo),
            headers: {
                'Content-type': 'application/json',
            },
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error){
        console.error(`Error en la API: ${error.message}`);
        throw new ResponseApiError('No se pudo crear el usuario');
    }
}