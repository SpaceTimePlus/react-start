import { observable, computed, action, autorun } from 'mobx';
import { demo } from '../actions';

class Demo {
  @observable name = '';

  @computed
  get fullName() {
    return `全名 ` + this.name;
  }

  @action
  setName = name => {
    this.name = name;
  };

  demo() {
    demo();
  }
}

export default new Demo();
