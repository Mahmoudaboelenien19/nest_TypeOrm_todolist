import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = bcrypt.hashSync(
      (password + process.env.BCRYPT_SECRET) as unknown as string,
      Number(process.env.BCRYPT_SALT_ROUNDS as unknown as string),
    );
    return this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  async getUserData(id: string) {
    // Use the `userId` to query the user data from the database or any other data source
    const user = await this.userRepository.findOne({ where: { id } });

    // Return the user data
    return user;
  }
}
