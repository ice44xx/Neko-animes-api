import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  private users: Users[] = [
    {
      id: 1,
      firstName: 'Nathan',
      userName: 'ice44xx',
      email: 'ice44xx@gmail.com',
      password: '020619',
    },
  ];

  findAll() {}

  findOne() {}

  create() {}
}
