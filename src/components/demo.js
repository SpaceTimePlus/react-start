import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer, onError, disposeOnUnmount } from 'mobx-react';

export default
@inject('demo')
@observer
class Demo extends Component {
  @observable title = 'DEMO';
  @observable name = 'GO';

  constructor(props) {
    super(props);
    this.store = props.demo;
  }

  componentWillMount() {
    console.log('this.store', this.store);
  }

  componentWillReact() {
    console.log('I will re-render, since the todo has changed!');
  }

  @disposeOnUnmount // 组件卸载时执行
  test() {
    console.log('disposeOnUnmount');
  }

  // 自动绑定action
  @action.bound
  demoMethods(e) {
    console.log('e', e.currentTarget.getAttribute('dataparam'));
    // 严格模式下，observable 状态必须通过action来更新
    this.title = 'HHHHHHH';
    // 调用action更新store状态
    this.store.setName('LL');
    this.store.demo();
  }

  render() {
    return (
      <div onClick={this.demoMethods} dataparam={'CLICK ME'}>
        {this.store.fullName} {this.title} {this.name} {this.store.age}
      </div>
    );
  }
}

onError(error => {
  console.log('bbbbbbb');
});
