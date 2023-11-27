import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
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

  async findOne(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }

  async register(user: any): Promise<any> {
    return this.users.push(user);
  }
}
