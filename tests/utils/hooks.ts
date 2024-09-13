import { Browser, Page } from '@playwright/test';
import { BasePage } from '../ui/pages/basePage';

type PageObjectConstructor<T extends BasePage> = new (page: Page) => T;

function beforeEach<T extends BasePage>(
  page: Page,
  PageObjectParam: PageObjectConstructor<T>
) {
  const pageObject = new PageObjectParam(page);
  return pageObject;
}

async function afterAll(page: Page) {
  await page.close();
}

export default { beforeEach, afterAll };
