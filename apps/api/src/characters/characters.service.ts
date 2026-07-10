import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CharacterFiltersInput } from './dto/character-filters.input';
import { Character } from './models/character.model';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters?: CharacterFiltersInput): Promise<Character[]> {
    const search = filters?.search?.trim();
    const where: Prisma.CharacterWhereInput = {
      ...(filters?.status ? { status: filters.status } : {}),
      ...(filters?.gender ? { gender: filters.gender } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    };

    return this.prisma.character.findMany({
      where,
      orderBy: { name: 'asc' },
    }) as Promise<Character[]>;
  }
}

