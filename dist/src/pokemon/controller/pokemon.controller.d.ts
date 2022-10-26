import { PokemonDto } from "./dto/pokemon.dto";
import { PokemonService } from "../service/pokemon.service";
export declare class PokemonController {
    private pokemonService;
    constructor(pokemonService: PokemonService);
    findAll(): Promise<import("./entity/pokemon.entity").PokemonEntity[]>;
    getPokemon(name: string): Promise<PokemonDto>;
}
