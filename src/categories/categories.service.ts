import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data });
  }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        collectibles: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        collectibles: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const exists = await this.findOne(id);
    if (!exists) {
      throw new NotFoundException(
        `Category with ID ${id} not found then cannot update`,
      );
    }
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const exists = await this.findOne(id);
    if (!exists) {
      throw new NotFoundException(
        `Category with ID ${id} not found then cannot remove`,
      );
    }
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
