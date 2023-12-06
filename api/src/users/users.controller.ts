import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.usersService.findOne(createUserDto.email);
    if (!user) {
      throw new ConflictException("this email isn't registered");
    }

    const checkPass = bcrypt.compareSync(
      createUserDto.password + process.env.BCRYPT_SECRET,
      user?.password as string,
    );
    if (!checkPass) {
      throw new ConflictException('password is wrong');
    }
    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('cookie')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const userData = await this.usersService.getUserData(data.id);
      return userData;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'you successfully logged out',
    };
  }
}
