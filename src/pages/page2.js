import React, { Component } from 'react';
import { observable, action, runInAction } from 'mobx';
import { inject, observer, disposeOnUnmount } from 'mobx-react';
import * as AFRAME from 'aframe';
import 'aframe-multi-video-component';
import 'aframe-gif-shader';
import 'aframe-physics-system';

// import '../assets/aframe-environment-component.min' // 环境组件：森林

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

    // 移动端漫游
    AFRAME.registerComponent('twoway-motion', {
      schema: {
        speed: { type: 'number', default: 40 },
        threshold: { type: 'number', default: -40 },
        nonMobileLoad: { type: 'boolean', default: false },
        removeCheckpoints: { type: 'boolean', default: true },
        chatty: { type: 'boolean', default: true }
      },
      init: function() {
        if (
          !AFRAME.utils.device.isMobile() ||
          this.data.nonMobileLoad === false
        ) {
          // this is only for mobile devices, unless you ask for it.
          return;
        }
        var twowaymotion = document.querySelector('[camera]').components[
          'twoway-motion'
        ];
        twowaymotion.componentName = 'twoway-motion';

        if (this.el.components['wasd-controls'] === undefined) {
          this.el.setAttribute('wasd-controls', 'true');
        }

        var canvas = document.querySelector('.a-canvas');

        canvas.addEventListener('mousedown', function(e) {
          twowaymotion.touching = true;
          this.touchTime = new Date().getTime();
        });
        canvas.addEventListener('mouseup', function(e) {
          twowaymotion.touching = false;
        });

        canvas.addEventListener('touchstart', function(e) {
          this.touch = e;
          if (e.touches.length > 1) {
          } else {
            twowaymotion.touching = true;
          }
        });
        canvas.addEventListener('touchend', function() {
          console.log(this.componentName, ' touchend');
          twowaymotion.touching = false;
        });
      },
      tick: function() {
        if (
          !AFRAME.utils.device.isMobile() ||
          this.data.nonMobileLoad === false
        ) {
          // this is only for mobile devices, unless you ask for it.
          return;
        }
        if (!this.isPlaying) {
          return;
        }
        var cam = this.el;
        var camrot = cam.getAttribute('rotation');

        if (camrot.x < this.data.threshold) {
          // we are looking down
          if (this.cur !== null && this.cur !== undefined) {
            this.cur.setAttribute('material', 'color', 'orange');
          }
          if (this.touching === true) {
            cam.components['wasd-controls'].keys['ArrowDown'] = true;
          } else {
            cam.components['wasd-controls'].keys['ArrowDown'] = false;
            cam.components['wasd-controls'].keys['ArrowUp'] = false;
          }
        } else {
          // we are looking forward or up
          if (this.cur !== null && this.cur !== undefined) {
            this.cur.setAttribute('material', 'color', this.curcolor);
          }
          if (this.touching === true) {
            cam.components['wasd-controls'].keys['ArrowUp'] = true;
          } else {
            cam.components['wasd-controls'].keys['ArrowDown'] = false;
            cam.components['wasd-controls'].keys['ArrowUp'] = false;
          }
        }
      }
    });

    // 注册组件
    AFRAME.registerComponent('log', {
      schema: {
        event: { type: 'string', default: '' },
        message: { type: 'string', default: '你好。' }
      },
      init() {
        var self = this;
        var stringToLog = self.data;
        console.log('stringToLog', stringToLog);
        this.eventHandlerFn = function() {
          console.log(self.data.message);
        };
      },
      update: function(oldData) {
        var data = this.data; // Component property values.
        var el = this.el; // Reference to the component's entity.
        // `event` updated. Remove the previous event listener if it exists.
        if (oldData.event && data.event !== oldData.event) {
          el.removeEventListener(oldData.event, this.eventHandlerFn);
        }
        if (data.event) {
          el.addEventListener(data.event, this.eventHandlerFn);
        } else {
          console.log(data.message);
        }
      },
      remove: function() {
        var data = this.data;
        var el = this.el;
        // Remove event listener.
        if (data.event) {
          el.removeEventListener(data.event, this.eventHandlerFn);
        }
      }
    });

    // 获取scene元素
    let sceneEl = document.querySelector('a-scene');
    console.log('sceneEl', sceneEl);

    // 事件处理
    sceneEl.setAttribute('log', {
      event: 'anotherEvent',
      message: 'Hello, new event!'
    });
    sceneEl.emit('anEvent');

    // 允许一个组件的多个实例
    // sceneEl.setAttribute('log__helloworld', {message: 'Hello, World!'});
    // sceneEl.setAttribute('log__metaverse', {message: 'Hello, Metaverse!'});

    // 通过ID获取元素
    console.log(sceneEl.querySelector('#box'));
    // 通过css class 获取元素
    console.log(sceneEl.querySelectorAll('.clickable'));
    // 获取一组元素
    console.log(sceneEl.querySelectorAll('a-box'));

    // 获取属性值
    sceneEl.getAttribute('geometry');

    // 添加实体
    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('do-something-once-loaded', '');
    sceneEl.appendChild(entityEl);

    // 移除实体
    let box = sceneEl.querySelector('#box');
    // box.parentNode.removeChild(box);

    // 更新实体
    box.setAttribute('geometry', {
      primitive: 'box',
      height: 2,
      width: 1
    });
    box.setAttribute('dynamic-body', {
      shape: 'box',
      mass: 150,
      linearDamping: 5
    });

    // 移除实体属性
    box.removeAttribute('color');

    let box2 = sceneEl.querySelector('#box2');

    // 使用 .emit() 来发出一个事件
    box.emit('physicscollided', { collidingEntity: box2 }, true);

    // 使用 .addEventListener() 方法来添加事件侦听器
    entityEl.addEventListener('collide', function(event) {
      console.log('Entity collided with', event.detail.collidingEntity);
    });

    // 事件
    box2.addEventListener('collide', function(evt) {
      console.log('This A-Frame entity collided with another entity! 碰撞');
    });

    // 更新属性
    this.changeAttr();

    // 获取世界坐标
    let entity = sceneEl.querySelector('#entity');
    console.log('entity', entity);
    let position = entity.object3D.getWorldPosition();
    console.log('position', position);

    // 事件封装
    AFRAME.registerComponent('scale-on-mouseenter', {
      schema: {
        to: { default: '2.5 2.5 2.5' }
      },
      init: function() {
        var data = this.data;
        this.el.addEventListener('mouseenter', function() {
          console.log('mouseenter');
        });
        this.el.addEventListener('mouseleave', function() {
          console.log('mouseleave');
        });
        this.el.addEventListener('click', function() {
          console.log('CLICKED');
        });
      }
    });

    // 实体属性访问
    // let audio1 = document.querySelector('#audio1');
    // console.log('audio1', audio1.pause())

    // emit在实体上发出自定义DOM事件
    // box.emit('rotate');

    // 字符串转json
    console.log(
      "AFRAME.utils.coordinates.parse('1 2 -3')",
      AFRAME.utils.coordinates.parse('1 2 -3')
    );
    // json转字符串
    console.log(
      'AFRAME.utils.coordinates.stringify({x: 1, y: 2, z: -3})',
      AFRAME.utils.coordinates.stringify({
        x: 1,
        y: 2,
        z: -3
      })
    );

    // 把一个类似CSS样式的字符串解析为一个对象。
    AFRAME.utils.styleParser.parse('attribute: color; dur: 5000;'); // >> {"attribute": "color", "dur": "5000"}
    // 把一个对象转化为一个类似CSS样式的字符串。
    AFRAME.utils.styleParser.stringify({ height: 10, width: 5 }); // >> "height: 10; width: 5"

    // 获取属性
    let preset = AFRAME.utils.entity.getComponentProperty(
      entity,
      'environment.preset'
    );
    console.log('preset', preset);
    let environment = AFRAME.utils.entity.getComponentProperty(
      entity,
      'environment'
    );
    console.log('environment', environment);

    // 设置属性
    AFRAME.utils.entity.setComponentProperty(entity, 'geometry.width', 1);
    AFRAME.utils.entity.setComponentProperty(entity, 'geometry', { depth: 3 });

    // 检查设备是否是手机。返回一个boolean.
    AFRAME.utils.device.isMobile();

    // 设置位置属性
    // With three.js
    // box.object3D.position.set(1, 2, 3);
    // With .setAttribute (less recommended).
    box.setAttribute('position', { x: 1, y: 2, z: 3 });
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
        {/* fog 雾，雾气浓度 density:0.00025*/}
        <a-scene
          vr-mode-ui="enabled:true;"
          fog="type: exponential;density:0.0;"
          background="color: gray;transparent:false;"
        >
          <a-sky src="#sky" />

          <a-entity
            id="cam"
            camera="fov:80;zoom:1;"
            twoway-motion="nonMobileLoad: true; chatty: false;"
            position="0 1.6 4"
            wasd-controls="fly: true;easing:20;"
            look-controls="reverseMouseDrag:false;"
          >
            <a-cursor color="#fff;" opacity="0.3" origin="mouse">
              <a-animation
                begin="click"
                easing="ease-in"
                attribute="scale"
                fill="backwards"
                from="0.1 0.1 0.1"
                to="1 1 1"
                dur="150"
              />
              <a-animation
                begin="cursor-fusing"
                easing="ease-in"
                attribute="scale"
                from="1 1 1"
                to="0.1 0.1 0.1"
                dur="1500"
              />
            </a-cursor>
            <a-entity cursor="rayOrigin: mouse;" />
          </a-entity>

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
              id="duck"
              src="https://vr.josh.earth/assets/models/imp_character/scene.gltf"
            />
            <a-asset-item
              id="guo"
              src="https://vr.josh.earth/assets/models/evil_cauldron/scene.gltf"
            />

            {/*<a-asset-item id="streetLight"*/}
            {/*src="https://raw.githubusercontent.com/8600/useear/master/gltf/StreetLight.gltf"></a-asset-item>*/}
            {/*<a-asset-item id="tree"*/}
            {/*src="https://raw.githubusercontent.com/8600/useear/master/Tree.gltf"></a-asset-item>*/}
            {/*mixin*/}
            <a-mixin id="red" material="color: red" />

            {/*音频*/}
            <audio
              id="audio1"
              src="https://oss-cn-beijing.aliyuncs.com/weiwuu-unity/resource/3945245323201/audio/21536326852104.mp3"
            />
            {/*视频*/}
            <video
              id="video1"
              src="https://oss-cn-beijing.aliyuncs.com/weiwuu-unity/resource/3945245323201/audio/35880330174753.mp4"
            />
            {/*gif*/}
            <img
              id="gifdemo"
              src="http://img.soogif.com/kjjnS1BvBZEdps1XrVTC0JlrkgVbqhiQ.gif"
            />
          </a-assets>

          {/*环境组件*/}
          {/*<a-entity environment="preset: yavapai;" shadow="true"></a-entity>*/}

          {/*链接*/}
          <a-entity
            link="href: page; title: My Homepage; image: #xingkong; borderColor: #fff; backgroundColor: green; highlighted:false;"
            position="-3 2 -4"
          />

          <a-entity
            environment="preset: none;"
            position="0 0 -10"
            cursor
            id="entity"
            line="start: 0, 1, 0; end: 2 0 -5; color: red"
          >
            <a-gltf-model
              src="#duck"
              model-loaded={() => console.log('TTTTTTTTT')}
            >
              <a-animation
                attribute="rotation"
                dur="10000"
                to="0 360 0"
                repeat="indefinite"
              />
            </a-gltf-model>
            <a-gltf-model src="#guo">
              <a-animation
                attribute="rotation"
                dur="10000"
                to="0 360 0"
                repeat="indefinite"
              />
              <a-animation
                attribute="visible"
                from="false"
                to="true"
                repeat="indefinite"
              />
              <a-animation
                attribute="visible"
                begin="click"
                dur="10000"
                to="false"
              />
            </a-gltf-model>

            <a-box
              position="1 1 6"
              rotation="0 45 45"
              scale="1 1 1"
              color="#4CC3D9"
              src="#xingkong"
              scale-on-mouseenter="to: 2.2 2.2 2.2"
            >
              {/*动画*/}
              <a-animation
                attribute="position"
                to="1 2 6"
                direction="alternate"
                dur="2000"
                repeat="indefinite"
              />
              {/*事件动画*/}
              <a-animation
                attribute="scale"
                begin="mouseenter"
                dur="300"
                to="2.3 2.3 2.3"
              />
              <a-animation
                attribute="scale"
                begin="mouseleave"
                dur="300"
                to="1 1 1"
              />
              <a-animation
                attribute="rotation"
                begin="click"
                dur="2000"
                to="360 405 45"
              />
              <a-animation
                attribute="material.color"
                begin="click"
                to="red"
                dur="1000"
              />
            </a-box>

            <a-box
              position="-1 0 0"
              rotation="0 45 45"
              scale="1 1 1"
              color="#4CC3D9"
              id="box"
            >
              <a-sphere position="1 0 3" />
            </a-box>

            {/*视频纹理*/}
            <a-box
              position={this.position}
              rotation="0 0 0"
              color="red"
              id="box2"
              aframe-multi-video-component="src: #video1; time:0; duration: 0; volume: 0.5; autoplay:true;"
            />

            <a-sphere position="0 1.25 -5" radius="1.25" src="#wenli" />
            <a-cylinder
              position="1 0.75 -3"
              radius="0.5"
              height="1.5"
              mixin="red"
            />
            <a-plane
              src="#xingkong"
              color="gray"
              position="0 0 0"
              rotation="-90 0 0"
              width="40"
              height="40"
              repeat="10 10"
            />
          </a-entity>

          {/*文本*/}
          <a-text
            value="Hello, A-Frame!"
            color="#BBB"
            position="-0.9 0.2 -3"
            scale="1.5 1.5 1.5"
            fontImage="#wenli"
          />

          <a-entity
            text="value: Hello World;color:#BBB;side: double;"
            position="-0.9 0.2 -3"
          />
          {/*光源*/}
          {/*<a-light type="ambient" color="#445451"></a-light>*/}
          {/*<a-light type="point" intensity="2" position="2 4 4"></a-light>*/}

          {/*音频*/}
          {/*<a-sound src="#audio1"*/}
          {/*autoplay="true" loop="true" volume="1" position="0 0 0"></a-sound>*/}

          {/*gif纹理*/}
          <a-entity
            id="audio"
            geometry="primitive: box;width:2;height:2;depth:2;"
            material="shader:gif;src:#gifdemo;"
            sound="src:#audio1;autoplay:false;poolSize:2;"
            onClick={this.playAudio}
          />

          <a-curvedimage
            src="#wenli"
            height="3.0"
            radius="5.7"
            theta-length="72"
            rotation="0 100 0"
            scale="0.8 0.8 0.8"
          />
        </a-scene>
      </div>
    );
  }
}
