import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BugsService } from './bug.service';
import { CreateBugDto } from './dto/create-bug.dto';
import { FilterBugDto } from './dto/filter-bug.dto';
import { UpdatePeriorityBugDto } from './dto/update-periority-bug';
import { UpdateStatusBugDto } from './dto/update-status-bug.dto';
import { Bug } from './bug.entity';
import { DeleteResult } from 'typeorm';

@Controller('bugs')
export class BugsController {
  constructor(private bugsService: BugsService) {}

  @Get()
  async getBugs(@Query() filterBug: FilterBugDto): Promise<Bug[]> {
    return this.bugsService.searchBugs(filterBug);
  }
  @Get('/:id')
  async getBug(@Param('id') id: string): Promise<Bug> {
    return this.bugsService.getBug(id);
  }

  @Delete('/:id')
  async deleteBug(
    @Param('id') id: string,
  ): Promise<DeleteResult | NotFoundException> {
    return this.bugsService.deleteBug(id);
  }

  @Patch('/:id/solved')
  async toggleSolvedBug(@Param('id') id: string): Promise<Bug> {
    return this.bugsService.toggleSolvedBug(id);
  }

  @Patch('/:id/periority')
  async changePeriorityBug(
    @Param('id') id: string,
    @Body() updatePeriorityBugDto: UpdatePeriorityBugDto,
  ): Promise<Bug> {
    const { periority } = updatePeriorityBugDto;
    return this.bugsService.changePeriorityBug(id, periority);
  }

  @Patch('/:id/status')
  async changeStatusBug(
    @Param('id') id: string,
    @Body() updateStatusBugDto: UpdateStatusBugDto,
  ): Promise<Bug> {
    const { status } = updateStatusBugDto;
    return this.bugsService.changeStatusBug(id, status);
  }

  @Post()
  async createBug(@Body() createBugDto: CreateBugDto): Promise<Bug> {
    return this.bugsService.createBug(createBugDto);
  }
}
