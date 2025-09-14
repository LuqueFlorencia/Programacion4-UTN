import { faker } from '@faker-js/faker'

export class Producto {
    constructor(){
        this.id = faker.number.int({max: 999});
        this.nombre = faker.commerce.productName();
    }
}
