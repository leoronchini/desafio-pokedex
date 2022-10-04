import { IsString } from "class-validator";

export class CreatePokemonDto {
    @IsString() readonly name: string;
    @IsString() readonly link: string;
}