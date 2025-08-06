import { Module } from '@nestjs/common';
import { CollectiblesService } from './collectibles.service';
import { CollectiblesController } from './collectibles.controller';

@Module({
  controllers: [CollectiblesController],
  providers: [CollectiblesService],
})
export class CollectiblesModule {}
