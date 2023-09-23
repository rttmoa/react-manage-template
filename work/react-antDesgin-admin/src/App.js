import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './app.css';
import Login from './pages/login/Login';
import Main from './routes/index';




class App extends React.Component {
  render() {
    return (
      <div className="App">

        {/* 这里有登陆页面 和 后台页面(routes->indexjs) */}
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/" component={ Main } />
          <Redirect to="/" />
        </Switch>

      </div>
    );
  }
}

export default App;