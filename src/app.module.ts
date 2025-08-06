import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CollectiblesModule } from './collectibles/collectibles.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CategoriesModule, CollectiblesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
