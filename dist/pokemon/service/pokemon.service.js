"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pokemon_entity_1 = require("../controller/entity/pokemon.entity");
const pokemon_dto_1 = require("../controller/dto/pokemon.dto");
const pokemon_repository_1 = require("../controller/repository/pokemon.repository");
const rxjs_1 = require("rxjs");
let PokemonService = class PokemonService {
    constructor(pokesEntity, httpService, pokemonRepository) {
        this.pokesEntity = pokesEntity;
        this.httpService = httpService;
        this.pokemonRepository = pokemonRepository;
    }
    async getAllPokemon() {
        console.log(`Returned all pokemons from database.`);
        return await this.pokesEntity.find();
    }
    async getPokemon(name) {
        let pokemonDto;
        pokemonDto = await this.getPokemonFromDatabase(name);
        if (!pokemonDto) {
            pokemonDto = await this.getPokemonFromApi(name);
        }
        return pokemonDto;
    }
    async getPokemonFromDatabase(name) {
        try {
            let pokemonResult;
            await this.pokemonRepository.findByName(name).then(result => {
                if (!result)
                    return null;
                pokemonResult = new pokemon_dto_1.PokemonDto(result.name, result.link);
            });
            console.log("aaaaaaa");
            console.log(`Pokemon has found on database: ${pokemonResult}`);
            return pokemonResult;
        }
        catch (err) {
            throw (`An error occurred while getting pokemon from database: ${err.message}`);
        }
    }
    async getPokemonFromApi(name) {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            const pokemonName = response.data.name;
            const pokemonLink = response.data.sprites.other['official-artwork'].front_default;
            const pokemonResult = new pokemon_dto_1.PokemonDto(pokemonName, pokemonLink);
            await this.savePokemonOnDatabase(pokemonResult);
            console.log(`Pokemon has found on api: ${pokemonResult}`);
            return pokemonResult;
        }
        catch (err) {
            if (err.code === 404) {
                throw (`The pokemon ${name} does not exist on api. Error: ${err.message}`);
            }
            throw (`An error occurred while getting pokemon from api: ${err.message}`);
        }
    }
    async savePokemonOnDatabase(pokemonResult) {
        try {
            await this.pokemonRepository.save(pokemonResult);
            console.log("Pokemon has inserted on database");
        }
        catch (err) {
            throw (`An error occurred while inserting pokemon on database: ${err.message}`);
        }
    }
};
PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pokemon_entity_1.PokemonEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        pokemon_repository_1.PokemonRepository])
], PokemonService);
exports.PokemonService = PokemonService;
//# sourceMappingURL=pokemon.service.js.map