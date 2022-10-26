import { Repository } from 'typeorm';
import { PokemonDto } from '../dto/pokemon.dto';
import { PokemonEntity } from '../entity/pokemon.entity';
export declare class PokemonRepository {
    private pokemonRepository;
    constructor(pokemonRepository: Repository<PokemonEntity>);
    save(pokemon: PokemonDto): Promise<void>;
    findByName(name: string): Promise<PokemonEntity>;
}
