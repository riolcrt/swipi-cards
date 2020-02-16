import { newE2EPage } from '@stencil/core/testing';

describe('rg-swipi-cards', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rg-swipi-cards></rg-swipi-cards>');

    const element = await page.find('rg-swipi-cards');
    expect(element).toHaveClass('hydrated');
  });
});
