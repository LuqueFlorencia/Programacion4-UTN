import { obtenerChistesRandom, obtenerCategorias } from './chucknorris.js'
import { obtenerPersonajes } from './rickandmorty.js'
import { obtenerPokemon } from './pokemon.js'

/*console.log("CHUCK NORRIS: ");

let chiste = await obtenerChistesRandom();
let chisteData = {
    Id: chiste.id,
    Valor: chiste.value
};

console.log('>> Chiste random: ', chisteData);

let categorias = await obtenerCategorias();
console.log(`>> Lista de categorias de chistes: ${categorias}`);*/

/*console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>");
console.log("RICK AND MORTY: ");

let todosPersonajes = await obtenerPersonajes()
console.log("Obtener todos los personajes: ", todosPersonajes);

let id = 1;
let personajePorId = await obtenerPersonajes(id)
console.log("Obtener el personaje con id = ", id ,": ", personajePorId);

let nameRickAndMorty = "Morty";
let personajesPorNombre = await obtenerPersonajes(null, nameRickAndMorty)
console.log("Obtener los personajes con nombre = ", nameRickAndMorty ,": ", personajesPorNombre);*/

console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>");
console.log("POKEMON: ");

let namePokemon = "Pikachu";
let pokemon = await obtenerPokemon(namePokemon);
console.log("Obtener pokemon por nombre = ", namePokemon, ": ", pokemon);
