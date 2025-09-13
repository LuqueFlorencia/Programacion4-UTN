import User from "./user.js";
import Chat from "./chat.js";

const chat = new Chat();
const user1 = new User();
const user2 = new User();

chat.agregarUsuario(user1);
chat.agregarUsuario(user2);

console.log(`USUARIOS: `);
chat.mostrarUsuarios();
console.log('---');

console.log(`MENSAJES: `);
user1.enviarMsj(user2, "Hola, ¿cómo estás?");
user2.enviarMsj(user1, "Hola, estoy bien, gracias. ¿Y tú?");
