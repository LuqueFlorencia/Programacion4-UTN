class Chat {
  constructor() {
    this.usuarios = [];
    this.mensajes = [];
  };

  agregarUsuario(usuario) {
    this.usuarios.push(usuario);
  };

  mostrarUsuarios() {
    this.usuarios.forEach(usuario => {
      console.log(`ID: ${usuario.id}, Nombre: ${usuario.name}, Email: ${usuario.email}`);
    });
  };

  mostrarMensajes() {
    this.usuarios.forEach(usuario => {
      console.log(`Mensajes de ${usuario.name}:`);
      usuario.mensajes.forEach(mensaje => {
        console.log(`  De: ${mensaje.emisor.name}, Para: ${mensaje.destinatario.name}, Contenido: ${mensaje.contenido}, Fecha: ${mensaje.fecha}`);
      });
    });
  };
};

export default Chat;