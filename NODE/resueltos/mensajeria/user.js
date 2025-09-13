import { faker } from '@faker-js/faker';
import Mensaje from './mensaje.js';

class User {
  constructor() {
    this.id = faker.number.int({ min: 1, max: 1000 });
    this.name = faker.person.fullName();
    this.email = faker.internet.email();
  };

  enviarMsj(destinatario, msj) {
    const fecha = new Date();
    const mensaje = new Mensaje(this, destinatario, msj, fecha);
    console.log(`Emisor: ${JSON.stringify(mensaje.emisor.name)}`);
    console.log(`Email: ${JSON.stringify(mensaje.emisor.email)}`);
    console.log(`Destinatario: ${JSON.stringify(mensaje.destinatario.name)}`);
    console.log(`Email: ${JSON.stringify(mensaje.destinatario.email)}`);
    console.log(`Fecha: ${JSON.stringify(mensaje.fecha)}`);
    console.log(" ")
    console.log(`Contenido: ${JSON.stringify(mensaje.contenido)}`);
    console.log("---------------------------------------------------")
  }
};

export default User;