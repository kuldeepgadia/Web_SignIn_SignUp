import { newSpecPage } from '@stencil/core/testing';
import { MySecondComponent } from '../my-second-component';

describe('my-second-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MySecondComponent],
      html: `<my-second-component></my-second-component>`,
    });
    expect(page.root).toEqualHtml(`
      <my-second-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-second-component>
    `);
  });
});
