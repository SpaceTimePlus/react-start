import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './store';

import Button from '@material-ui/core/Button';
import Demo from './components/demo';

// 开启严格模式
configure({ enforceActions: 'observed' });

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <div style={{ marginTop: 20 + 'px' }}>
              <Button variant="contained" color="primary">
                Hello World
              </Button>
            </div>
            <Demo />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
