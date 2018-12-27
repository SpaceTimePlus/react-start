import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

export default
@inject('demo')
@observer
class Demo extends Component {
  constructor(props) {
    super(props);
    this.store = props.demo;
    this.state = {
      title: 'TITLE',
      name: 'DEMO'
    };
  }

  componentWillMount() {
    console.log('this.store', this.store);
  }

  demoMethods(param) {
    // 更新组件内状态
    this.setState({
      title: 'TTTTT'
    });
    // 调用action更新store状态
    this.store.setName('LL');
    this.store.demo();
  }

  render() {
    return (
      <div onClick={() => this.demoMethods('Click DEMO')}>
        {this.store.fullName} {this.state.title} {this.state.name}
      </div>
    );
  }
}
