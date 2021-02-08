import { r as registerInstance, h, e as Host } from './index-182ac87e.js';

const mySecondComponentCss = ":host{display:block}";

const MySecondComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
MySecondComponent.style = mySecondComponentCss;

export { MySecondComponent as my_second_component };
