import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer, disposeOnUnmount } from 'mobx-react';

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
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
    console.log('props', props.history);
    this.id = props.match.params.id;
    this.history = props.history;
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
    console.log('disposeOnUnmount PAGE 2');
  }

  @action.bound
  routerTo() {
    // 路由跳转
    this.history.push('/page');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>PAGE 2</p>
          <div style={{ marginTop: 20 + 'px' }}>
            <Button variant="contained" color="primary" onClick={this.routerTo}>
              Hello World
            </Button>
          </div>
        </header>
      </div>
    );
  }
}
