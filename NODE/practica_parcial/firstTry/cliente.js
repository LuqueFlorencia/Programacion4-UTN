import { faker } from '@faker-js/faker';

class Cliente {
  id;
  nombre;
  apellido;

  constructor(){
    this.id = faker.number.int({max: 999});
    this.nombre = faker.person.firstName();
    this.apellido = faker.person.lastName();
  }
}

export default Cliente;