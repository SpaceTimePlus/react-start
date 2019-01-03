import React, { Component } from 'react';
import { observable, action, runInAction } from 'mobx';
import { inject, observer, disposeOnUnmount } from 'mobx-react';
import * as AFRAME from 'aframe';
import 'aframe-rain';

export default
@inject('demo')
@observer
class Page extends Component {
  @observable title = 'DEMO';
  @observable name = 'GO';

  @observable position;

  constructor(props) {
    super(props);
    this.store = props.demo;
    console.log('props', props.history);
    this.id = props.match.params.id;
    this.history = props.history;

    this.position = '-3 0.5 -3';
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

  @action
  changeAttr() {
    setTimeout(() => {
      runInAction(() => {
        this.position = '-2 0.5 -3';
      });
    }, 3000);
  }

  @action.bound
  routerTo() {
    // 路由跳转
    this.history.push('/page');
  }

  @action.bound
  modelLoaded() {
    console.log('modelLoaded');
  }

  @action.bound
  playAudio() {
    let audio = document.querySelector('#audio');
    console.log('audio', audio.components);
    let sound = audio.components.sound;
    if (sound.isPlaying) {
      sound.pauseSound();
    } else {
      sound.playSound();
    }
  }

  render() {
    return (
      <div className="vr-page">
        {/*fog 雾，雾气浓度 density:0.00025*/}
        <a-scene
          vr-mode-ui="enabled:true;"
          fog="type: exponential;density:0.0;color:#000;"
          background="color: gray;transparent:false;"
          rain="splashBounce:2;"
        >
          <a-sky src="#sky" />
          <a-camera
            position="0 2 3"
            far="10000"
            fov="80"
            look-controls-enabled="true"
            near="0.005"
            reverse-mouse-drag="false"
          >
            <a-entity cursor="rayOrigin: mouse;" />
          </a-camera>

          <a-assets timeout="1000">
            <img
              id="xingkong"
              src="https://imgs.krpano.weiwuu.com/resource/3945245323201/images/62068682069499.jpg"
            />
            <img
              id="wenli"
              src="https://www.toptal.com/designers/subtlepatterns/patterns/retina_wood.png"
            />
            <img
              id="sky"
              src="https://imgs.krpano.weiwuu.com/resource/6429681323201/images/17010330345906.jpg"
            />
            <a-asset-item
              id="guo"
              src="https://vr.josh.earth/assets/models/evil_cauldron/scene.gltf"
            />

            <a-mixin id="red" material="color: red" />

            {/*音频*/}
            <audio
              id="audio1"
              src="https://oss-cn-beijing.aliyuncs.com/weiwuu-unity/resource/3945245323201/audio/21536326852104.mp3"
            />
            {/*视频*/}
            <video
              id="video1"
              autoPlay
              src="http://vr.cnquanjing.com/17/video/1482771526772yht.mp4"
            />
          </a-assets>
          {/*全景视频*/}
          {/*<a-videosphere src="#video1"></a-videosphere>*/}

          <a-entity>
            <a-sphere
              position="0 0 -3"
              color="yellow"
              radius="1"
              src="#sky"
              side="both"
            >
              <a-animation
                attribute="rotation"
                dur="36000"
                to="0 360 0"
                repeat="indefinite"
              />
            </a-sphere>
          </a-entity>
          <a-entity geometry="primitive:sphere" aframe-rain />
          <a-entity
            light="type:directional;color:#666"
            position="-10 -10 -10"
          />
        </a-scene>
      </div>
    );
  }
}
