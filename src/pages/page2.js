import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer, disposeOnUnmount } from 'mobx-react';
import * as AFRAME from 'aframe';

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

    AFRAME.registerComponent('log', {
      schema: { type: 'string' },

      init: function() {
        var stringToLog = this.data;
        console.log('stringToLog', stringToLog);
      }
    });
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
        <a-scene log="Hello, Scene!">
          <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" />
          <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" />
          <a-cylinder
            position="1 0.75 -3"
            radius="0.5"
            height="1.5"
            color="#FFC65D"
          />
          <a-plane
            position="0 0 -4"
            rotation="-90 0 0"
            width="40"
            height="4"
            color="#7BC8A4"
          />
          <a-sky color="#000" />
        </a-scene>
      </div>
    );
  }
}
