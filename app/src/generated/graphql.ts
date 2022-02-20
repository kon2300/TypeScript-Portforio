import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Article = {
  __typename?: 'Article';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<User>;
};

export type Auth = {
  __typename?: 'Auth';
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateArticleInput = {
  comment: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateProfileInput = {
  age: Scalars['String'];
  name: Scalars['String'];
  selfIntroduction: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginAuthInput = {
  email: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Article;
  createProfile: Profile;
  createUser: User;
  loginAuth: Token;
  removeArticle: Article;
  removeUser: User;
  updateArticle: Article;
};


export type MutationCreateArticleArgs = {
  createArticleInput: CreateArticleInput;
};


export type MutationCreateProfileArgs = {
  createProfileInput: CreateProfileInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginAuthArgs = {
  loginAuthInput: LoginAuthInput;
};


export type MutationRemoveArticleArgs = {
  removeArticleInput: RemoveArticleInput;
};


export type MutationRemoveUserArgs = {
  removeUserInput: RemoveUserInput;
};


export type MutationUpdateArticleArgs = {
  updateArticleInput: UpdateArticleInput;
};

export type Profile = {
  __typename?: 'Profile';
  age: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  selfIntroduction: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  findAllArticle: Array<Maybe<Article>>;
  findAllUser: Array<Maybe<User>>;
  findOneArticle?: Maybe<Article>;
  findOneUser?: Maybe<User>;
};


export type QueryFindOneArticleArgs = {
  id: Scalars['String'];
};


export type QueryFindOneUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type RemoveArticleInput = {
  id: Scalars['String'];
};

export type RemoveUserInput = {
  id: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
  id: Scalars['ID'];
};

export type UpdateArticleInput = {
  comment: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Array<Maybe<Article>>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  emailVerifiedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  password: Scalars['String'];
  profile?: Maybe<Profile>;
  profileVerifiedAt?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type FindAllArticleQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllArticleQuery = { __typename?: 'Query', findAllArticle: Array<{ __typename?: 'Article', id: string, comment: string, updatedAt: any, users?: { __typename?: 'User', profile?: { __typename?: 'Profile', name: string, age: string } | null } | null } | null> };

export type FindOneUserQueryVariables = Exact<{
  findOneUserId?: InputMaybe<Scalars['ID']>;
}>;


export type FindOneUserQuery = { __typename?: 'Query', findOneUser?: { __typename?: 'User', id: string, profileVerifiedAt?: any | null, profile?: { __typename?: 'Profile', name: string, age: string } | null, articles?: Array<{ __typename?: 'Article', comment: string, createdAt: any } | null> | null } | null };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, password: string } };

export type LoginAuthMutationVariables = Exact<{
  loginAuthInput: LoginAuthInput;
}>;


export type LoginAuthMutation = { __typename?: 'Mutation', loginAuth: { __typename?: 'Token', id: string, accessToken: string } };

export type CreateProfileMutationVariables = Exact<{
  createProfileInput: CreateProfileInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', name: string, age: string, selfIntroduction: string } };

export type CreateArticleMutationVariables = Exact<{
  createArticleInput: CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id: string, comment: string } };


export const FindAllArticleDocument = gql`
    query findAllArticle {
  findAllArticle {
    id
    comment
    updatedAt
    users {
      profile {
        name
        age
      }
    }
  }
}
    `;

/**
 * __useFindAllArticleQuery__
 *
 * To run a query within a Vue component, call `useFindAllArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllArticleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindAllArticleQuery();
 */
export function useFindAllArticleQuery(options: VueApolloComposable.UseQueryOptions<FindAllArticleQuery, FindAllArticleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllArticleQuery, FindAllArticleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllArticleQuery, FindAllArticleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindAllArticleQuery, FindAllArticleQueryVariables>(FindAllArticleDocument, {}, options);
}
export function useFindAllArticleLazyQuery(options: VueApolloComposable.UseQueryOptions<FindAllArticleQuery, FindAllArticleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllArticleQuery, FindAllArticleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllArticleQuery, FindAllArticleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindAllArticleQuery, FindAllArticleQueryVariables>(FindAllArticleDocument, {}, options);
}
export type FindAllArticleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindAllArticleQuery, FindAllArticleQueryVariables>;
export const FindOneUserDocument = gql`
    query FindOneUser($findOneUserId: ID) {
  findOneUser(id: $findOneUserId) {
    id
    profileVerifiedAt
    profile {
      name
      age
    }
    articles {
      comment
      createdAt
    }
  }
}
    `;

/**
 * __useFindOneUserQuery__
 *
 * To run a query within a Vue component, call `useFindOneUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindOneUserQuery({
 *   findOneUserId: // value for 'findOneUserId'
 * });
 */
export function useFindOneUserQuery(variables: FindOneUserQueryVariables | VueCompositionApi.Ref<FindOneUserQueryVariables> | ReactiveFunction<FindOneUserQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<FindOneUserQuery, FindOneUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindOneUserQuery, FindOneUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindOneUserQuery, FindOneUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindOneUserQuery, FindOneUserQueryVariables>(FindOneUserDocument, variables, options);
}
export function useFindOneUserLazyQuery(variables: FindOneUserQueryVariables | VueCompositionApi.Ref<FindOneUserQueryVariables> | ReactiveFunction<FindOneUserQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<FindOneUserQuery, FindOneUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindOneUserQuery, FindOneUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindOneUserQuery, FindOneUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindOneUserQuery, FindOneUserQueryVariables>(FindOneUserDocument, variables, options);
}
export type FindOneUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindOneUserQuery, FindOneUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    email
    password
  }
}
    `;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *     createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(options: VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateUserMutation, CreateUserMutationVariables>;
export const LoginAuthDocument = gql`
    mutation loginAuth($loginAuthInput: LoginAuthInput!) {
  loginAuth(loginAuthInput: $loginAuthInput) {
    id
    accessToken
  }
}
    `;

/**
 * __useLoginAuthMutation__
 *
 * To run a mutation, you first call `useLoginAuthMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginAuthMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginAuthMutation({
 *   variables: {
 *     loginAuthInput: // value for 'loginAuthInput'
 *   },
 * });
 */
export function useLoginAuthMutation(options: VueApolloComposable.UseMutationOptions<LoginAuthMutation, LoginAuthMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginAuthMutation, LoginAuthMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginAuthMutation, LoginAuthMutationVariables>(LoginAuthDocument, options);
}
export type LoginAuthMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginAuthMutation, LoginAuthMutationVariables>;
export const CreateProfileDocument = gql`
    mutation createProfile($createProfileInput: CreateProfileInput!) {
  createProfile(createProfileInput: $createProfileInput) {
    name
    age
    selfIntroduction
  }
}
    `;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateProfileMutation({
 *   variables: {
 *     createProfileInput: // value for 'createProfileInput'
 *   },
 * });
 */
export function useCreateProfileMutation(options: VueApolloComposable.UseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
}
export type CreateProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateArticleDocument = gql`
    mutation createArticle($createArticleInput: CreateArticleInput!) {
  createArticle(createArticleInput: $createArticleInput) {
    id
    comment
  }
}
    `;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateArticleMutation({
 *   variables: {
 *     createArticleInput: // value for 'createArticleInput'
 *   },
 * });
 */
export function useCreateArticleMutation(options: VueApolloComposable.UseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
}
export type CreateArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateArticleMutation, CreateArticleMutationVariables>;