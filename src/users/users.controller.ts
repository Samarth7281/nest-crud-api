import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Put,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Get all Users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  //Get one user
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }

  //Create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  //Update user
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return await this.usersService.update(id, user);
  }

  //Patch user
  @Patch(':id')
  async patch(@Param('id') id: number, @Body() partialUser: Partial<User>) {
    return await this.usersService.patch(id, partialUser);
  }

  //Delete user
  @Delete('/:id')
  async delete(@Param() params: { id: number }): Promise<void> {
    console.log('hello from delete');
    const user = await this.usersService.findOne(params.id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return await this.usersService.delete(params.id);
    }
  }
}
