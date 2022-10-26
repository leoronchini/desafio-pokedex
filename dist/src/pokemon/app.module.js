"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_module_1 = require("@nestjs/typeorm/dist/typeorm.module");
const pokemon_entity_1 = require("./controller/entity/pokemon.entity");
const pokemon_controller_1 = require("./controller/pokemon.controller");
const pokemon_service_1 = require("./service/pokemon.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_module_1.TypeOrmModule.forRoot(), typeorm_module_1.TypeOrmModule.forFeature([pokemon_entity_1.PokemonEntity]), axios_1.HttpModule],
        controllers: [pokemon_controller_1.PokemonController],
        providers: [pokemon_service_1.PokemonService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map