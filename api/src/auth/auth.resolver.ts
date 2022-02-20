import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../utils/local-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation('loginAuth')
  login(@Context() context) {
    return this.authService.login(context.user);
  }
}
