/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class PokemonService {
    private readonly pokemonModel;
    private readonly configService;
    defaultLimit: number;
    constructor(pokemonModel: Model<Pokemon>, configService: ConfigService);
    create(createPokemonDto: CreatePokemonDto): Promise<import("mongoose").Document<unknown, {}, Pokemon> & Omit<Pokemon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(paginationDto: PaginationDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Pokemon> & Omit<Pokemon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[], import("mongoose").Document<unknown, {}, Pokemon> & Omit<Pokemon & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, Pokemon>;
    findOne(term: string): Promise<Pokemon>;
    update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<{
        no?: number;
        name?: string;
    }>;
    remove(id: string): Promise<void>;
    private handleExeptions;
}
