import { faker } from '@faker-js/faker'

export class Producto {
    constructor(duracion){
        this.id = faker.number.int({min: 1, max: 999});
        this.nombre = faker.commerce.productName();
        this.duracion = Number(duracion);
    }
}
