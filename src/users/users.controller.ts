import { Controller, Get, Post, Param, Body, Query, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiTags, ApiQuery, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({type: User, isArray: true})
  @ApiQuery({name: 'name', required: false})
  @Get()
  getUsers(@Query('name') name: string): User[] {
    return this.userService.findAll(name)
  }

  @ApiOkResponse({type: User})
  @ApiNotFoundResponse()
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findOne(id)
    if(!user) throw new NotFoundException()
    return user
  }

  @ApiCreatedResponse({type: User})
  @ApiBadRequestResponse({ description: 'Request does not meet validation rules.'})
  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto)
  }
}
