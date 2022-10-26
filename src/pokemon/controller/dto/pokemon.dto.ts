import { IsString } from "class-validator";

export class PokemonDto {
    @IsString() readonly name: string;
    @IsString() readonly link: string;

    constructor(name: string, link: string) {
        this.name = name;
        this.link = link;
    }
}