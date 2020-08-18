import React from 'react'
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apolloClient'

import { MainDashboard } from './pages/MainDashboard'
import { ProductDetail } from './pages/ProductDetail'
import { ProductDetailRouteProps } from './types/routeProps'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/product/:productId/:coupangProductId"
              component={(props: RouteComponentProps<ProductDetailRouteProps>) => (
                <ProductDetail {...props} />
              )}
            />

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
