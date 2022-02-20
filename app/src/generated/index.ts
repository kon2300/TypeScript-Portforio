import gql from 'graphql-tag'

gql`
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
`

gql`
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
`

gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      email
      password
    }
  }
`

gql`
  mutation loginAuth($loginAuthInput: LoginAuthInput!) {
    loginAuth(loginAuthInput: $loginAuthInput) {
      id
      accessToken
    }
  }
`

gql`
  mutation createProfile($createProfileInput: CreateProfileInput!) {
    createProfile(createProfileInput: $createProfileInput) {
      name
      age
      selfIntroduction
    }
  }
`

gql`
  mutation createArticle($createArticleInput: CreateArticleInput!) {
    createArticle(createArticleInput: $createArticleInput) {
      id
      comment
    }
  }
`
