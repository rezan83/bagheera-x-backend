import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    // const { title, description } = createUserDto;
    const user = this.userRepository.create({
      ...createUserDto,
    });

    // const newUser = new User();
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
  async findOne(email: string): Promise<User> {
    const found = await this.userRepository.findOneBy({ email });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
