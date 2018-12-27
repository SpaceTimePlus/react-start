import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

export default
@inject('store')
@observer
class Detail extends Component {
  constructor(props) {
    super(props);
    this.store = props.store.demo;
    this.state = {};
  }

  componentWillMount() {}

  demoMethods() {
    console.log('demoMethods');
  }

  render() {
    const _o = this.store.detail;

    return <div onClick={this.demoMethods()}>DEMO</div>;
  }
}
