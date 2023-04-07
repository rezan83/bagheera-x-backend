import { Module } from '@nestjs/common';
import { BugsService } from './bug.service';
import { BugsController } from './bug.controller';
// import { BugProviders } from './bug.providers';
// import { DatabaseModule } from 'src/databse/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bug } from './bug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bug])],
  exports: [TypeOrmModule],
  providers: [BugsService],
  controllers: [BugsController],
})
export class BugsModule {}
