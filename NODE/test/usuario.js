import { Publicacion } from './publicacion.js'
import { ErrorParametro } from './errores.js'

export class Usuario {
    constructor(id, name, username, email, address, city, phone){
        this.id = id;
        this.nombre = name;
        this.usuario = username;
        this.email = email;
        this.direccion = address;
        this.ciudad = city;
        this.telefono = phone;
        this.publicaciones = [];
    }

    // Agregar posteos al usuario
    agregarPosteo(posteos) {
        posteos.forEach(post => {
            let id = post.id;
            let title = post.title;
            let body = post.body;

            if (!id || !title || !body) {
                throw new ErrorParametro("Faltan parametros obligatorio");
            }

            let publicacion = new Publicacion(id, title, body);
            this.publicaciones.push(publicacion);
        });
    };

    obtenerPublicaciones(){
        return this.publicaciones;
    };
};