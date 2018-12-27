import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as stores from './store';

// 不允许在动作之外进行状态修改

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

console.log('REACT_APP_NAME', process.env.REACT_APP_NAME);
