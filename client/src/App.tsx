import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom'

import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apolloClient'

import { MainDashboard } from './pages/MainDashboard'
import { ProductDetail } from './pages/ProductDetail'
import { CategoryDashboard } from './pages/CategoryDashboard'
import { CartDashboard } from './pages/CartDashboard'

import { SearchDashboard } from './pages/SearchDashboard'
import { SearchResultDashboard } from './pages/SearchResultDashboard'
import { LoginDashboard } from './pages/LoginDashboard'
import { LikedProductDashboard } from './pages/LikedProductDashboard'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { PrivateRoute } from './routes/PrivateRoute'
import { HistoryDashboard } from './pages/HistoryDashboard'

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Router>
              <Switch>
                <Route
                  path="/login"
                  component={(props: RouteComponentProps) => <LoginDashboard {...props} />}
                />
                <PrivateRoute exact={true} path="/product/:productId" component={ProductDetail} />
                <PrivateRoute
                  exact={true}
                  path="/category/:categoryId"
                  component={CategoryDashboard}
                />
                <PrivateRoute exact={true} path="/cart" component={CartDashboard} />
                <PrivateRoute exact={true} path="/favorite" component={LikedProductDashboard} />
                <PrivateRoute exact={true} path="/history" component={HistoryDashboard} />
                <PrivateRoute exact={true} path="/search" component={SearchDashboard} />
                <PrivateRoute
                  exact={true}
                  path="/search-result"
                  component={SearchResultDashboard}
                />
                <PrivateRoute exact={true} path="/" component={MainDashboard} />
                <Redirect to={{ pathname: '/' }} />
              </Switch>
            </Router>
          </div>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
