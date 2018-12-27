import { observable, computed, action, autorun } from 'mobx';
import { demo } from '../actions';

class Demo {
  @observable name = 'DH';

  @computed
  get fullName() {
    return `全名 ` + this.name;
  }

  @action
  setName = name => {
    this.name = name;
  };

  @action
  demo() {
    demo(this.fullName);
  }

  // autorun
  print = autorun(e => console.log(e, this.fullName));
}

export default new Demo();
