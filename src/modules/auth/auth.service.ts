import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, phone, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });
    if (existingUser) {
      throw new ConflictException('Email or phone already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    const { password: _, ...safeUser } = user;
    return { message: 'User registered successfully', user: safeUser };
  }
}
