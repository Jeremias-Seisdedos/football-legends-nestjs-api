import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectibleDto } from './dto/create-collectible.dto';
import { UpdateCollectibleDto } from './dto/update-collectible.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectiblesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCollectibleDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${dto.categoryId} not found`,
      );
    }
    return this.prisma.collectible.create({ data: dto });
  }
  async findAll() {
    const collectibles = await this.prisma.collectible.findMany({
      include: {
        category: true,
      },
    });
    if (!collectibles || collectibles.length === 0) {
      throw new NotFoundException('No collectibles found');
    }
    return collectibles;
  }

  async findOne(id: number) {
    const collectible = await this.prisma.collectible.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    if (!collectible) {
      throw new NotFoundException(`Collectible with ID ${id} not found`);
    }
    return collectible;
  }

  async update(id: number, updateCollectibleDto: UpdateCollectibleDto) {
    const collectible = await this.prisma.collectible.findUnique({
      where: { id },
    });
    if (!collectible) {
      throw new NotFoundException(`Collectible with ID ${id} not found`);
    }
    return this.prisma.collectible.update({
      where: { id },
      data: updateCollectibleDto,
    });
  }

  async remove(id: number) {
    const collectible = await this.prisma.collectible.findUnique({
      where: { id },
    });
    if (!collectible) {
      throw new NotFoundException(`Collectible with ID ${id} not found`);
    }
    return this.prisma.collectible.delete({
      where: { id },
    });
  }
}
