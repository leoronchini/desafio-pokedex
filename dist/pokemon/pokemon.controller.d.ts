import { CreatePokemonDto } from "./create-pokemon.dto";
import { PokemonInterface } from "./pokemon.interface";
import { PokemonService } from "./pokemon.service";
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    getPokemon(): Promise<PokemonInterface[]>;
    createPokemon(createPokemonDto: CreatePokemonDto): Promise<void>;
}
