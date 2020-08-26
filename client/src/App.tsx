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
import { AuthProvider } from './context/AuthContext'
import { PrivateRoute } from './routes/PrivateRoute'

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="App">
          <Router>
            <Switch>
              <Route
                path="/login"
                component={(props: RouteComponentProps) => <LoginDashboard {...props} />}
              />
              <PrivateRoute path="/product/:productId" component={ProductDetail} />
              <PrivateRoute path="/category/:categoryId" component={CategoryDashboard} />
              <PrivateRoute path="/cart" component={CartDashboard} />
              <PrivateRoute path="/favorite" component={LikedProductDashboard} />
              <PrivateRoute path="/search" component={SearchDashboard} />
              <PrivateRoute path="/search-result" component={SearchResultDashboard} />
              <PrivateRoute path="/" component={MainDashboard} />
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
