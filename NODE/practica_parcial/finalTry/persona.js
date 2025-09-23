import { faker } from '@faker-js/faker'

export class Persona {
    constructor(id, nombre){
        this.id = id ?? faker.number.int({min: 1, max: 999});
        this.nombre = nombre ?? faker.person.fullName();
    }
}