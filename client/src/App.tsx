import React from 'react'
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom'

import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apolloClient'

import { MainDashboard } from './pages/MainDashboard'
import { ProductDetail } from './pages/ProductDetail'
import { CategoryDashboard } from './pages/CategoryDashboard'
import { CartDashboard } from './pages/CartDashboard'

import { ProductDetailRouteProps, CategoryDashboardRouteProps } from './types/routeProps'
import { SearchDashboard } from './pages/SearchDashboard'
import { SearchResultDashboard } from './pages/SearchResultDashboard'
import { LoginDashboard } from './pages/LoginDashboard'
import { LikedProductDashboard } from './pages/LikedProductDashboard'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/login"
              component={(props: RouteComponentProps) => <LoginDashboard {...props} />}
            />
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
              path="/search"
              component={(props: RouteComponentProps) => <SearchDashboard {...props} />}
            />
            <Route
              path="/search-result"
              component={(props: RouteComponentProps) => <SearchResultDashboard {...props} />}
            />
            <Route path="/favorite" component={LikedProductDashboard} />
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
