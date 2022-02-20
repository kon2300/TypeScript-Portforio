import { Module } from '@nestjs/common';
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core/dist/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { ProfilesModule } from './profiles/profiles.module';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLISODateTime, JSON: GraphQLJSON },
    }),
    UsersModule,
    AuthModule,
    ArticlesModule,
    ProfilesModule,
  ],
})
export class AppModule {}
