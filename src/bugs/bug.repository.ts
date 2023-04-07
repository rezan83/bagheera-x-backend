// import { NotFoundException } from '@nestjs/common';
// import { DataSource, Repository } from 'typeorm';
// import { Bug } from './bug.entity';
// import { Periority, Status } from './bug.types';
// import { CreateBugDto } from './dto/create-bug.dto';

// export class CustomBugRepository extends Repository<Bug> {
//   constructor(private dataSource: DataSource) {
//     super(Bug, dataSource.createEntityManager());
//   }
//   async getBug(id: string): Promise<Bug> {
//     const found = await this.findOneBy({ id });
//     if (!found) {
//       throw new NotFoundException();
//     }
//     return found;
//   }
//   async createBug(createBugDto: CreateBugDto): Promise<Bug> {
//     // const { title, description } = createBugDto;
//     const bug = this.create({
//       ...createBugDto,
//       done: false,
//       status: Status.OPEN,
//       periority: Periority.LOW,
//     });

//     // const newBug = new Bug();
//     const savedBug = await this.save(bug);
//     return savedBug;
//   }
//   async changePropertyBug(
//     id: string,
//     property: Periority | Status,
//   ): Promise<Bug> {
//     const found = await this.getBug(id);
//     found[typeof property] = property;
//     const changeBug = await this.save(found);
//     return changeBug;
//   }
// }
