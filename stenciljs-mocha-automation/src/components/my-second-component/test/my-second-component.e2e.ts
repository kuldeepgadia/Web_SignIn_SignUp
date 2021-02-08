import { newE2EPage } from '@stencil/core/testing';

describe('my-second-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-second-component></my-second-component>');

    const element = await page.find('my-second-component');
    expect(element).toHaveClass('hydrated');
  });
});
