import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
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
          <CssBaseline />
          <div style={{ marginTop: 20 + 'px' }}>
            <Button variant="contained" color="primary">
              Hello World
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
