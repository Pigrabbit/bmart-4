import React from 'react'
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom'

import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apolloClient'

import { MainDashboard } from './pages/MainDashboard'
import { ProductDetail } from './pages/ProductDetail'
import { CategoryDashboard } from './pages/CategoryDashboard'
import { CartDashboard } from './pages/CartDashboard'

import { ProductDetailRouteProps, CategoryDashboardRouteProps } from './types/routeProps'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/product/:productId"
              component={(props: RouteComponentProps<ProductDetailRouteProps>) => (
                <ProductDetail {...props} />
              )}
            />
            <Route
              path="/category/:categoryId"
              component={(props: RouteComponentProps<CategoryDashboardRouteProps>) => (
                <CategoryDashboard {...props} />
              )}
            />
            <Route
              path="/cart"
              component={(props: RouteComponentProps) => <CartDashboard {...props} />}
            />
            <Route
              path="/"
              component={(props: RouteComponentProps) => <MainDashboard {...props} />}
            />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  )
}

export default App
