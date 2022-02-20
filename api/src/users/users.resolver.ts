import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../utils/jwt-auth.guard.ts';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: Prisma.UsersCreateInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.usersService.remove({ id });
  }

  @Query('findAllUser')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query('findOneUser')
  findOne(@Args('id') id: string) {
    return this.usersService.findOne({ id });
  }
}
