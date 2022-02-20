import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../utils/jwt-auth.guard.ts';
import { ArticlesService } from './articles.service';

@Resolver('Article')
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createArticle')
  create(
    @Args('createArticleInput') createArticleInput: Prisma.ArticlesCreateInput,
  ) {
    return this.articlesService.create(createArticleInput);
  }

  @Query('findAllArticle')
  findAll() {
    return this.articlesService.findAll();
  }

  @Query('findOneArticle')
  findOne(@Args('id') id: Prisma.ArticlesWhereUniqueInput) {
    return this.articlesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateArticle')
  update(
    @Args('updateArticleInput')
    updateArticleInput: Prisma.ArticlesUpdateWithWhereUniqueWithoutUsersInput,
  ) {
    return this.articlesService.update(updateArticleInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeArticle')
  remove(@Args('id') id: Prisma.ArticlesWhereUniqueInput) {
    return this.articlesService.remove(id);
  }
}
