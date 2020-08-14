import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainDashboard } from './pages/MainDashboard'

import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apolloClient'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/">
              <MainDashboard />
            </Route>
            <Route path="/category">
              <MainDashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  )
}

export default App
