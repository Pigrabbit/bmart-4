import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainDashboard } from './pages/MainDashboard'

import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { GRAPHQL_URI } from './utils/constants'

const link = createHttpLink({
  uri: GRAPHQL_URI
})
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/">
              <MainDashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  )
}

export default App
