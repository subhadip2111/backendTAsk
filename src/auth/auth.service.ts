import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { User } from 'src/user/entities/user.entity';
import APIFeatures from 'src/utils/apiFeatures.utils';

import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async signIn(email: string, password: string) {
    const result = await this.repo.findOne({
      select: ['password', 'name', 'id', 'email'],
      where: {
        email: email,
      },
    });
    if (!result) {
      throw new UnauthorizedException('Please register your account ');
    }
    const comparePassword = await bcrypt.compare(password, result.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = await APIFeatures.assignJwtToken(result.id, this.jwtService);
    return { token, result };
  }

  async validate(id: string) {
    const user = await this.repo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('Account not found');
    }
    return user;
  }
}
