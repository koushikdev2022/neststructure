import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto ,@Res() res: Response) {
    return this.authService.register(createUserDto,res);
  }
  @Get('user/list')
  async list(@Res() res: Response) {
    console.log("hi")
    return this.authService.list(res);
  }
}
