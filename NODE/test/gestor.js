import { Usuario } from './usuario.js'
import { ErrorParametro } from './errores.js'

export class Gestor {
    constructor() {
        this.usuarios = [];
    }

    // Agregar usuarios extraidos de la API
    agregarUsuarios(usuariosApi) {
        usuariosApi.forEach(user => {
            let id = user.id;
            let name = user.name;
            let username = user.username;
            let email = user.email;
            let address = user.address.street + ' ' + user.address.suite;
            let city = user.address.city;
            let phone = user.phone;

            if (!id || !name || !username || !email || !address || !city || !phone) {
                throw new ErrorParametro("Faltan parametros obligatorio");
            }

            let usuario = new Usuario(id, name, username, email, address, city, phone);
            this.usuarios.push(usuario);
        });
    };

    // Agregar publicaciones por usuario extraidos de la API
    agregarPublicacionesPorUsuario(publicacionesApi) {
        this.usuarios.forEach(user => {
            let posteosPorUser = publicacionesApi.filter(x => x.userId === user.id)
            user.agregarPosteo(posteosPorUser);
        });
    };

    // Buscar un usuario por su email.
    buscarUsuarioPorMail(email) {
        let usuario = this.usuarios.filter(x => x.email.toLowerCase() === email.toLowerCase());
        return usuario;
    };

    // Listar todas las publicaciones de un usuario dado.
    listarPublicacionesPorUsuario(userID) {
        if (typeof userID === 'number') {
            let id = Number(userID);
            let usuario = this.usuarios.find(x => x.id === id);
            return usuario.obtenerPublicaciones();
        } else {
            throw new ErrorParametro("El id proporcionado no es válido");
        }
    };

    // Crear un mapeo donde cada usuario tenga asociadas sus publicaciones.
    mapearUsuariosPublicaciones(){
        this.usuarios.forEach(user => {
            let publicaciones = user.obtenerPublicaciones();

            console.log(`Nombre de usuario: ${user.nombre}. Tiene: ${publicaciones.length} numero de publicaciones.`, publicaciones);
        });
    };

    // Implementar un método que muestre los usuarios con más publicaciones (por ejemplo, el Top 3).
    topUsuariosConMasPublicaciones(topN = 3){
        const orden = this.usuarios.sort((a,b) => b.publicaciones.length - a.publicaciones.length);
        const top = orden.slice(0, topN);

        top.forEach((usuario, i) => {
            console.log(
                `${i + 1}. ${usuario.nombre} (${usuario.usuario}) → ${usuario.publicaciones.length} publicaciones`
            );
        });
    };

    // Implementar un método que permita buscar publicaciones que contengan cierta palabra clave en el título o contenido.
    buscarPublicacionPorPalabra(palabra) {
        const posteos = [];

        this.usuarios.forEach(user => {
            user.publicaciones.forEach(post => {
                if (
                    post.titulo.toLowerCase().includes(palabra.toLowerCase()) ||
                    post.cuerpo.toLowerCase().includes(palabra.toLowerCase())
                ) {
                    posteos.push({
                        usuario: user.nombre,
                        titulo: post.titulo,
                        cuerpo: post.cuerpo
                    });
                }
            });
        });

        return posteos;
    };

}