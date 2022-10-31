import { mock } from 'jest-mock-extended';

import { PokemonService } from "../service/pokemon.service";
import { PokemonDto } from './dto/pokemon.dto';
import { PokemonController } from "./pokemon.controller";

describe('PokemonController', () => {
    // const pokemonService = mock<PokemonService>();
    let pokemonService: PokemonService;
    // const pokemonController = new PokemonController(
    //     pokemonService,
    // )
    const pokemonController =  mock<PokemonController>();
    beforeEach(() => {
        jest.resetAllMocks();
    });


    describe('getPokemon', () => {
        it('should return a list of pokemon ', () => {

            // const mockPokemon = new PokemonEntity('pokeLink', 'pokeName');
            // pokemonRepositoryMock.findByName.mockResolvedValue(mockPokemon);
            // const result = await pokemonService.getPokemon('name');

            // expect(pokemonController).toBeDefined();

            const result = new Promise<PokemonDto>(() => {
                return new PokemonDto('pokeLink', 'pokeName');
            });
    
            // jest.spyOn(pokemonService, 'getPokemonByName').mockImplementation(() => result);
    
            expect(pokemonController.getPokemon('name')).toBe(result);
        });
    });
});