
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateArticleInput {
    userId: string;
    comment: string;
}

export class UpdateArticleInput {
    comment: string;
}

export class RemoveArticleInput {
    id: string;
}

export class LoginAuthInput {
    id?: Nullable<string>;
    email: string;
    password: string;
}

export class CreateProfileInput {
    userId: string;
    age: string;
    name: string;
    selfIntroduction: string;
}

export class CreateUserInput {
    email: string;
    password: string;
}

export class RemoveUserInput {
    id: string;
}

export class Article {
    id: string;
    users?: Nullable<User>;
    comment: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export abstract class IQuery {
    abstract findAllArticle(): Nullable<Article>[] | Promise<Nullable<Article>[]>;

    abstract findOneArticle(id: string): Nullable<Article> | Promise<Nullable<Article>>;

    abstract findAllUser(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract findOneUser(id?: Nullable<string>, email?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createArticle(createArticleInput: CreateArticleInput): Article | Promise<Article>;

    abstract updateArticle(updateArticleInput: UpdateArticleInput): Article | Promise<Article>;

    abstract removeArticle(removeArticleInput: RemoveArticleInput): Article | Promise<Article>;

    abstract loginAuth(loginAuthInput: LoginAuthInput): Token | Promise<Token>;

    abstract createProfile(createProfileInput: CreateProfileInput): Profile | Promise<Profile>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract removeUser(removeUserInput: RemoveUserInput): User | Promise<User>;
}

export class Auth {
    email: string;
    password: string;
}

export class Token {
    id: string;
    accessToken: string;
}

export class Profile {
    id: string;
    age: string;
    user?: Nullable<User>;
    name: string;
    selfIntroduction: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class User {
    id: string;
    profile?: Nullable<Profile>;
    articles?: Nullable<Nullable<Article>[]>;
    email: string;
    password: string;
    emailVerifiedAt?: Nullable<DateTime>;
    profileVerifiedAt?: Nullable<DateTime>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type DateTime = any;
export type JSON = any;
type Nullable<T> = T | null;
