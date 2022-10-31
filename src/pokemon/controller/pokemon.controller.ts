import { Body, Controller, Get, Param } from "@nestjs/common";
import { PokemonDto } from "./dto/pokemon.dto";
import { PokemonService } from "../service/pokemon.service";

  @Controller('pokemon')
  export class PokemonController {
    constructor(private pokemonService: PokemonService) {}
  
    @Get(':name')
    async getPokemon(@Param('name') name: string): Promise<PokemonDto> {
      return await this.pokemonService.getPokemon(name);
    }
}