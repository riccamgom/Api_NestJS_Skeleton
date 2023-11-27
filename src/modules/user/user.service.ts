import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: any): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  //Mock data
  private readonly users = [
    {
      userId: 1,
      username: 'luis',
      password: 'pass1',
      role: 'admin',
      company: 'company1',
      team: 'team1',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'pass2',
      role: 'manager',
      company: 'company2',
      team: 'team2',
    },
  ];

  /*async findOne(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }*/

  async register(user: any): Promise<any> {
    return this.users.push(user);
  }
}
