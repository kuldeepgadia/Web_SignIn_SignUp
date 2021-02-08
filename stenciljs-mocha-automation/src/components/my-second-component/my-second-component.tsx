import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-second-component',
  styleUrl: 'my-second-component.css',
  shadow: true,
})
export class MySecondComponent {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
