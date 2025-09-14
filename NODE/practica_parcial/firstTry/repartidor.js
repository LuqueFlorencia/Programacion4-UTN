import { fa, faker } from '@faker-js/faker';

class Repartidor {
  id;
  nombre;

  constructor(){
    this.id = faker.number.int({max: 999})
    this.nombre = faker.person.fullName();
  }
}

export default Repartidor;