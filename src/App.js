import React, { Component } from 'react';

import './assets/css/App.css';

import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './store';

import { BrowserRouter as Router } from 'react-router-dom';

import Main from './routers';

// 开启严格模式
configure({ enforceActions: 'observed' });

const BASE_NAME = process.env.REACT_APP_BASE_NAME;

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router basename={BASE_NAME} keyLength={12}>
          <Main />
        </Router>
      </Provider>
    );
  }
}

export default App;
