import {
  observable,
  computed,
  action,
  autorun,
  when,
  reaction,
  runInAction
} from 'mobx';
import { demo } from '../actions';

class Demo {
  @observable name = 'DH';
  @observable age = 20;
  @observable map = new Map();
  @observable arr = [];

  @computed
  get fullName() {
    return `全名 ` + this.name;
  }

  @action
  setName(name) {
    this.name = name;
  }

  @action
  async demo() {
    let result = await demo(this.fullName);
    // 在每个 await 之后，状态修改代码应该被包装成动作
    runInAction(() => {
      this.age = result + 1;
    });
  }

  // autorun
  print = autorun(async e => {
    console.log(e, this.fullName);
  });

  // 当 this.fullName.length > 0 时，执行
  whenDemo = when(
    () => this.fullName.length > 0,
    () => console.log('WHEN', this.fullName)
  );

  // 当 fullName 变化时，副作用执行；age 变化时，副作用不会执行
  reactionDemo = reaction(
    () => this.fullName,
    name => console.log('reaction ', name + this.age)
  );
}

export default new Demo();
