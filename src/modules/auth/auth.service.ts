import { ConflictException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {}
  async list(res):Promise<any>{
     const existingUser = await this.userRepository.find({
        where:[{
            status:1
        }],
        relations: ['role']
     });
     const convertDTO =plainToInstance(UserResponseDto, existingUser)
     return res.status(200).json({
        "message":"data found",
        "status_code":200,
        "status":false,
        "data":convertDTO
     }) 
    
  }
  async register(createUserDto: CreateUserDto , res): Promise<any> {
    const { email, phone, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });
    if (existingUser) {
       return res.status(422).json({
            message: 'user present',
            status: false,
            status_code: 422,
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    const { password: _, ...safeUser } = user;
    return res.status(422).json({
            message: 'User registered successfully', status:true, status_code:201, user: safeUser
    });
  }
}
