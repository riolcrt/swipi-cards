import { newE2EPage } from '@stencil/core/testing';

describe('rg-swipi-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rg-swipi-card></rg-swipi-card>');

    const element = await page.find('rg-swipi-card');
    expect(element).toHaveClass('hydrated');
  });
});
