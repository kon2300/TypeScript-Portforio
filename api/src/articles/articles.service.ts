import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArticlesInput: Prisma.ArticlesCreateInput) {
    return this.prisma.articles.create({ data: createArticlesInput });
  }

  findAll() {
    return this.prisma.articles.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        users: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  findOne(id: Prisma.ArticlesWhereUniqueInput) {
    return this.prisma.articles.findUnique({
      where: id,
      include: {
        users: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  update(
    updateArticlesInput: Prisma.ArticlesUpdateWithWhereUniqueWithoutUsersInput,
  ) {
    return this.prisma.articles.update(updateArticlesInput);
  }

  remove(id: Prisma.ArticlesWhereUniqueInput) {
    return this.prisma.articles.delete({ where: id });
  }
}
