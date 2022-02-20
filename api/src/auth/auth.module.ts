import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma.service';
import { LocalStrategy } from '../utils/local.strategy';
import { JwtStrategy } from '../utils/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '60m' },
      secret: 'secret',
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
