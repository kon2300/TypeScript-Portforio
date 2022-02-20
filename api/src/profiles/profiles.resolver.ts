import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard.ts';
import { ProfilesService } from './profiles.service';

@Resolver('Profile')
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createProfile')
  create(
    @Args('createProfileInput') createProfileInput: Prisma.ProfilesCreateInput,
  ) {
    return this.profilesService.create(createProfileInput);
  }
}
