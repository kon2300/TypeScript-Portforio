import { createApp, provide, h } from 'vue'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import router from './router'
import '@/assets/tailwind.css'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const authCheck = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    if (graphQLErrors[0].message) {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
    }
  }
})

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: from([authCheck, authLink.concat(httpLink)]),
  cache,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
app.use(createPinia())
app.use(router)
app.mount('#app')
