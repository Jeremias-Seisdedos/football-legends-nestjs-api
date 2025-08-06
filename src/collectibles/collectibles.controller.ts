import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CollectiblesService } from './collectibles.service';
import { CreateCollectibleDto } from './dto/create-collectible.dto';
import { UpdateCollectibleDto } from './dto/update-collectible.dto';

@Controller('collectibles')
export class CollectiblesController {
  constructor(private readonly collectiblesService: CollectiblesService) {}

  @Post()
  create(@Body() dto: CreateCollectibleDto) {
    return this.collectiblesService.create(dto);
  }

  @Get()
  findAll() {
    return this.collectiblesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collectiblesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectibleDto: UpdateCollectibleDto,
  ) {
    return this.collectiblesService.update(id, updateCollectibleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectiblesService.remove(id);
  }
}
