import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthInput } from '../graphql';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async localValidateUser(loginAuthInput: LoginAuthInput): Promise<any> {
    const user = await this.usersService.findOne({
      email: loginAuthInput.email,
    });
    const valid = await bcrypt.compare(loginAuthInput.password, user.password);
    if (user && valid) {
      return user;
    }
    return null;
  }

  async login(loginAuthInput: LoginAuthInput) {
    return {
      accessToken: this.jwtService.sign({
        username: loginAuthInput.id,
      }),
      id: loginAuthInput.id,
    };
  }
}
