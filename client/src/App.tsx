import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainDashboard } from './pages/MainDashboard'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <MainDashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
