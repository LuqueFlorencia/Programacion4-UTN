import { ErrorApi, ParametroError } from './error.js'

const urlBase = 'https://pokeapi.co/api/v2';

export async function obtenerPokemon(name){
    if (name !== null && typeof name === 'string'){
        name = name.trim();
    } else {
        throw new ParametroError();
    }

    let url = `${urlBase}/pokemon/${name}`

    try {
        let res = await fetch(url);
        let data = await res.json();

        console.log(data)

        let pokemon = {
            Id: data.id,
            Nombre: data.name,
            Altura: data.height,
            Peso: data.weight,
            Habilidades: data.abilities.map(item => item.ability.name),
            Esperiencia: data.base_experience,
            Forma: data.forms.map(item => item.form.name)
        }

        return pokemon;
    } catch (error) {
        console.error(error.message);
        throw new ErrorApi();
    }
}