import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { CryptoService } from 'src/common/crypto.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cryptoService: CryptoService,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    user.password = this.cryptoService.encrypt(user.password);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (!user) {
      return null;
    }
    const userReturn = {
      username: user.username,
      password: user.password,
      role: user.role,
    };
    return userReturn;
  }
}
