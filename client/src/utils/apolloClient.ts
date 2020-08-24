import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GRAPHQL_URI } from './constants'

const httplink = createHttpLink({
  uri: GRAPHQL_URI,
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
const cache = new InMemoryCache()
export const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache,
})
