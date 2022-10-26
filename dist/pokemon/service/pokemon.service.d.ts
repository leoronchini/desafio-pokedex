import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { PokemonEntity } from '../controller/entity/pokemon.entity';
import { PokemonDto } from '../controller/dto/pokemon.dto';
import { PokemonRepository } from '../controller/repository/pokemon.repository';
export declare class PokemonService {
    private pokesEntity;
    private readonly httpService;
    private readonly pokemonRepository;
    constructor(pokesEntity: Repository<PokemonEntity>, httpService: HttpService, pokemonRepository: PokemonRepository);
    getAllPokemon(): Promise<PokemonEntity[]>;
    getPokemon(name: string): Promise<PokemonDto>;
    getPokemonFromDatabase(name: string): Promise<PokemonDto>;
    getPokemonFromApi(name: string): Promise<PokemonDto>;
    savePokemonOnDatabase(pokemonResult: PokemonDto): Promise<void>;
}
