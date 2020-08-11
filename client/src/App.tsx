import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainDashboard } from './pages/MainDashboard'

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
