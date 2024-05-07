import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';

import { Public } from 'src/core/decorators';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '../user/user.service';
import {  UserDecorator } from 'src/core/decorators/user.decorator';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('login')
  @Public()
  async login(@Body() body: LoginDto) {
    return this.authService.login(
      await this.authService.validate(body.email, body.password),
    );
  }


  @Post('register')
  @Public()
  async register(@Body() body: RegisterDto) {
    console.log(body)
    if (await this.userService.getBuyerByEmail(body.email)) {
      throw new BadRequestException('Email already exists');
    }
    const buyer = await this.userService.create(body);

    return this.authService.login(buyer);
  }

  @Get('me')
  me(@UserDecorator() user: User) {
    return this.userService.getBuyerByEmail(user.email);
  }
}
