import { PokemonInterface } from './pokemon.interface';
export declare class PokemonService {
    private readonly pokemons;
    getPokemon(): PokemonInterface[];
    createPokemon(pokemon: PokemonInterface): void;
}
