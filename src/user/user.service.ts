import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const user = await this.repo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new ConflictException('email already register please login');
    }
    const hashPashword = await bcrypt.hash(createUserDto.password, 10)
    createUserDto.password = hashPashword
    const object = Object.assign(createUserDto);
    return await this.repo.save(object);
  }

  async findOne(id: string) {
    const result = await this.repo.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Account Not Found!');
    }
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Account Not Found!');
    }

    const object = Object.assign(result, updateUserDto);
    return this.repo.save(object);
  }

  async remove(id: string) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Account Not Found!');
    }
    return await this.repo.remove(result);
  }
}
