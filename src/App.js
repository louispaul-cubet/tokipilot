import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import store, { history } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home';

import './App.css';
import  Loader from './Common/Loader'
import './styles.scss';
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        
          <div>
          <Loader />
            <Route exact path="/" component={Home} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
