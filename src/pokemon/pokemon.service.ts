import {
	Injectable,
	BadRequestException,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
	defaultLimit: number;

	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,
		private readonly configService: ConfigService
	) {
		this.defaultLimit = this.configService.get<number>('defaultLimit');
	}

	async create(createPokemonDto: CreatePokemonDto) {
		createPokemonDto.name = createPokemonDto.name.toLowerCase();
		try {
			const pokemon = await this.pokemonModel.create(createPokemonDto);
			return pokemon;
		} catch (error) {
			this.handleExeptions(error);
		}
	}

	findAll(paginationDto: PaginationDto) {
		const { limit = this.defaultLimit, offset = 0 } = paginationDto;
		return this.pokemonModel
			.find()
			.limit(limit)
			.skip(offset)
			.sort({
				no: 1,
			})
			.select('-__v');
	}

	async findOne(term: string) {
		let pokemon: Pokemon;
		if (!isNaN(+term)) {
			pokemon = await this.pokemonModel.findOne({ no: term });
		}
		//? MongoID
		if (isValidObjectId(term)) {
			pokemon = await this.pokemonModel.findById(term);
		}
		//? Name
		if (!pokemon) {
			pokemon = await this.pokemonModel.findOne({
				name: term.toLowerCase().trim(),
			});
		}
		if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no ${term} not found`);
		return pokemon;
	}

	async update(term: string, updatePokemonDto: UpdatePokemonDto) {
		const pokemon = await this.findOne(term);
		try {
			if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
			await pokemon.updateOne(updatePokemonDto);
			return { ...pokemon.toJSON(), ...updatePokemonDto };
		} catch (error) {
			this.handleExeptions(error, 'update');
		}
	}

	async remove(id: string) {
		const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
		if (deletedCount === 0) throw new BadRequestException(`Pokemon with id ${id} not found`);
		return;
	}

	private handleExeptions(error: any, method: string = 'create') {
		if (error.code === 11000) {
			throw new BadRequestException(
				`Pokemon already exists in DB yarn start${JSON.stringify(error.keyValue)}}`
			);
		}
		console.log(error);
		throw new InternalServerErrorException(`Cannot ${method} pokemon - Check Server Logs`);
	}
}
