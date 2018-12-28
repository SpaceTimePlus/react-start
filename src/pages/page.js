import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer, disposeOnUnmount } from 'mobx-react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Demo from '../components/demo';
import logo from '../assets/images/logo.svg';

export default
@inject('demo')
@observer
class Page extends Component {
  @observable title = 'DEMO';
  @observable name = 'GO';

  constructor(props) {
    super(props);
    this.store = props.demo;
    console.log('props', props.match.params.id, this.props);
    this.id = props.match.params.id;
  }

  componentDidMount() {
    // 获取路由query参数
    let querys = new URLSearchParams(this.props.location.search);
    let id = querys.get('id');
    console.log('componentDidMount', id);
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate', prevProps);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentWillReact() {
    console.log('I will re-render, since the todo has changed!');
  }

  @disposeOnUnmount // 组件卸载时执行
  test() {
    console.log('disposeOnUnmount');
  }

  routerTo() {}

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
          <div style={{ marginTop: 20 + 'px' }}>
            <Link to="/page2?id=22222">
              <Button
                variant="contained"
                color="primary"
                onClick={this.routerTo}
              >
                Hello World
              </Button>
            </Link>
          </div>
          <Demo />
        </header>
      </div>
    );
  }
}
