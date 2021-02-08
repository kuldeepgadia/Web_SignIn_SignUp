import { r as registerInstance, h } from './index-182ac87e.js';

const myFirstComponentScss = ".active{display:block}.inactive{display:none}.card{margin-bottom:10px}";

const MyFirstComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.list = [
      {
        name: 'Udemy',
        description: 'Udemy is an online learning platform where anyone can create and upload courses. There are over 50,000 courses on the platform covering all trending topics for web developers. ',
        url: 'https://codingthesmartway.com/udemy',
        imageUrl: '/assets/1.jpg'
      },
      {
        name: 'Treehouse',
        description: 'Treehouse is focusing mainly on web design & coding. Here you can choose from 1,000s of hours of content from JavaScript to Python to iOS.',
        url: 'https://codingthesmartway.com/treehouse',
        imageUrl: '/assets/2.jpg'
      },
      {
        name: 'Coursera',
        description: 'Coursera offers online courses taught by actual college professors from Stanford, University of Michigan, Yale University and many more. Here you can earn your master`s degree fully online',
        url: 'https://codingthesmartway.com/coursera',
        imageUrl: '/assets/3.jpg'
      },
      {
        name: 'Pluralsight',
        description: 'Pluralsight offers thousands of courses authored by leading experts. Every course contains in-depth content that goes beond the fundamentals and teaches you practical skills you can apply immediately.',
        url: 'https://codingthesmartway.com/pluralsight',
        imageUrl: '/assets/4.jpg'
      }
    ];
    this.toggle = false;
  }
  //  @Event() onToggle: EventEmitter;
  toggleComponent() {
    this.toggle = !this.toggle;
    // this.onToggle.emit({visible: this.toggle})
  }
  render() {
    return (h("div", null, h("div", { class: "jumbotron" }, h("center", null, h("h1", { class: "display-3" }, "Welcome!"), h("p", { class: "lead" }, "This is a Stencil sample application - Demonstrating the power of pure web components!"), h("button", { class: "btn btn-primary", onClick: () => this.toggleComponent() }, "Learning Resources for Web Developers"))), h("div", { class: this.toggle ? 'active' : 'inactive' }, h("div", { class: "row" }, this.list.map(entry => h("div", { class: "col-lg-3 col-md-6 col-sd-12" }, h("div", { class: "card" }, h("a", { href: entry.url, target: "_blank" }, h("img", { class: "card-img-top", src: entry.imageUrl })), h("div", { class: "card-body" }, h("h4", { class: "card-title" }, entry.name), h("p", { class: "card-text" }, entry.description), h("a", { href: entry.url, class: "btn btn-success", target: "_blank" }, "Go to ", entry.name)))))))));
  }
};
MyFirstComponent.style = myFirstComponentScss;

export { MyFirstComponent as my_first_component };
