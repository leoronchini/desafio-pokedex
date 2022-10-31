import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { PokemonDto } from '../controller/dto/pokemon.dto';
import { PokemonEntity } from '../controller/entity/pokemon.entity';
import { PokemonRepository } from '../controller/repository/pokemon.repository';
import { PokemonService } from "./pokemon.service";

describe('pokemonService', () => { 
    const httpServiceMock = mock<HttpService>();
    const pokemonRepositoryMock = mock<PokemonRepository>();

    const pokemonService = new PokemonService(
        httpServiceMock,
        pokemonRepositoryMock,
    )

    
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getPokemonFromDatabase', () => {
        it('should return pokemon from database', async () => {
            const mockPokemon = new PokemonEntity('pokeLink', 'pokeName');
            pokemonRepositoryMock.findByName.mockResolvedValue(mockPokemon);
            const result = await pokemonService.getPokemon('name');

            expect(result).toEqual(mockPokemon );
        });
    });

    describe('getPokemonFromRepository', () => {
        it('should return pokemon from repository', async () => {
            const mockPokemon = new PokemonEntity('pokeLink', 'pokeName');

     
        });
    });
});