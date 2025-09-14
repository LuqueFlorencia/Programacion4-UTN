import { faker } from '@faker-js/faker'

export class Persona {
    constructor(){
        this.id = faker.number.int({max: 999});
        this.nombre = faker.person.fullName();
    }
}