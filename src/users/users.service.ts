import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { hash } from "bcryptjs";
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailExist = await this.userModel.exists({
      email: createUserDto.email,
    });
    const usernameExist = await this.userModel.exists({
      username: createUserDto.username,
    });

    if (emailExist) {
      throw new ConflictException('User with that email already exists');
    }

    if (usernameExist) {
      throw new ConflictException('User with that username already exists');
    }

    const passwordHash = await hash(createUserDto.password, 10);
    const userToCreate: User = {
      ...createUserDto,
      userId: randomUUID(),
      password: passwordHash,
      user_deleted_by: null,
      user_deleted_at: null,
      last_login_at: null,
    };
    return this.userModel.create(userToCreate);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
