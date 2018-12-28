import React, { Component } from 'react';

export default class NotFound extends Component {
  componentWillMount() {
    console.log('NOT FOUND', this.t);
  }

  render() {
    return <div style={{ textAlign: 'center' }}>找不到页面</div>;
  }
}
