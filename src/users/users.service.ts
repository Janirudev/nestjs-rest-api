import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {id: 0, name: 'Marius'},
    {id: 1, name: 'Dustin'},
    {id: 2, name: 'Max'},
    {id: 3, name: 'Janiru'},
  ]

  findAll(name?: string): User[]{
    if(name) return this.users.filter(user => user.name === name)
    if(name) return this.users.filter(user => user.name === name)
    return this.users
  }

  findOne(id): User{
    return this.users.find(user => user.id == id)
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = {
      id: Date.now(),
      ...createUserDto
    }
    this.users.push(newUser)
    return newUser
  }
}
