import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsersInput: Prisma.UsersCreateInput) {
    const user = await this.findOne({
      email: createUsersInput.email,
    });
    if (user) {
      throw new Error('登録済のユーザーです!');
    }
    createUsersInput.password = await bcrypt.hash(
      createUsersInput.password,
      10,
    );
    return this.prisma.users.create({ data: createUsersInput });
  }

  findAll() {
    return this.prisma.users.findMany({
      include: {
        articles: true,
        profile: true,
      },
    });
  }

  findOne(usersWhereUniqueInput: Prisma.UsersWhereUniqueInput) {
    return this.prisma.users.findUnique({
      where: usersWhereUniqueInput,
      include: {
        articles: true,
        profile: true,
      },
    });
  }

  remove(usersWhereUniqueInput: Prisma.UsersWhereUniqueInput) {
    return this.prisma.users.delete({ where: usersWhereUniqueInput });
  }
}
