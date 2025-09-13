import { faker } from '@faker-js/faker';

class Producto {
  id;
  nombre;

  constructor(){
    this.id = faker.number.int({max: 999});
    this.nombre = faker.commerce.product();
  }
}

export default Producto;