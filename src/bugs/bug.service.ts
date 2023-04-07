import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Bug } from './bug.entity';
import { Status, Periority } from './bug.types';
import { CreateBugDto } from './dto/create-bug.dto';
import { FilterBugDto } from './dto/filter-bug.dto';

@Injectable()
export class BugsService {
  constructor(
    @InjectRepository(Bug)
    private bugRepository: Repository<Bug>,
  ) {}

  async searchBugs(filterBug: FilterBugDto): Promise<Bug[]> {
    if (Object.keys(filterBug).length) {
      const { title, description, periority, status, strict } = filterBug;

      if (strict) {
        // find what meets all criteria
        // the ...(cond && {}) is to pass only what the user provided
        const foundStrictBugs = await this.bugRepository.find({
          where: [
            {
              ...(title && { title: ILike(`%${title}%`) }),
              ...(description && { description: ILike(`%${description}%`) }),
              ...(periority && { periority }),
              ...(status && { status }),
            },
          ],
        });

        return foundStrictBugs;
      }
      const foundBugs = await this.bugRepository.find({
        where: [
          { title: ILike(`%${title}%`) },
          { description: ILike(`%${description}%`) },
          { periority },
          { status },
        ],
      });
      return foundBugs;
    }
    const allBugs = await this.bugRepository.find();
    return allBugs;
  }
  async getBug(id: string): Promise<Bug> {
    const found = await this.bugRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async deleteBug(id: string): Promise<DeleteResult | NotFoundException> {
    const delRes = await this.bugRepository.delete(id);
    if (delRes.affected === 0) {
      throw new NotFoundException();
    }
    return delRes;
    // {
    // 	"raw": [],
    // 	"affected": 0
    // }
    // const found = await this.getBug(id);
    // const res = await this.bugRepository.remove(found);
  }
  async toggleSolvedBug(id: string): Promise<Bug> {
    const found = await this.getBug(id);
    found.solved = !found.solved;
    found.status = Status.FIXED;
    const changeBug = await this.bugRepository.save(found);
    return changeBug;
  }
  async changePeriorityBug(id: string, periority: Periority): Promise<Bug> {
    const found = await this.getBug(id);
    found.periority = periority;
    const changeBug = await this.bugRepository.save(found);
    return changeBug;
  }

  async changeStatusBug(id: string, status: Status): Promise<Bug> {
    const found = await this.getBug(id);
    found.status = status;
    const changeBug = await this.bugRepository.save(found);

    return changeBug;
  }
  async createBug(createBugDto: CreateBugDto): Promise<Bug> {
    // const { title, description } = createBugDto;
    const bug = this.bugRepository.create({
      ...createBugDto,
      solved: false,
      status: Status.OPEN,
      periority: Periority.LOW,
    });

    // const newBug = new Bug();
    const savedBug = await this.bugRepository.save(bug);
    return savedBug;
  }
}

// interface IUserQuery {
//   query1?: string;
//   query2?: string;
//   query3?: string;
// }
// //user send only query1;
// const userQuery: IUserQuery = { query1: 'query1' };
// //expecting between 0 - 3 queries;
// const { query1, query2, query3 } = userQuery;

// // object will not contain undefined
// const databasSearch = {
//   ...(query1 && { query1 }),
//   ...(query2 && { query2 }),
//   ...(query3 && { query3 }),
// };
