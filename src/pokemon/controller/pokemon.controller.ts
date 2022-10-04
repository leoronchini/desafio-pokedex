import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { PokemonInterface } from "./interface/pokemon.interface";
import { PokemonService } from "../service/pokemon.service";

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    async getPokemon(): Promise<PokemonInterface[]> {
        return this.pokemonService.getPokemon();
    }

    @Post()
    async createPokemon(@Body() createPokemonDto: CreatePokemonDto) {
        this.pokemonService.createPokemon(createPokemonDto);
    }
}