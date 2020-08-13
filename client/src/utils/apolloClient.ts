import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { GRAPHQL_URI } from './constants'

const link = createHttpLink({
  uri: GRAPHQL_URI,
})
const cache = new InMemoryCache()
export const client = new ApolloClient({
  link,
  cache,
})
