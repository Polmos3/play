import test, { Page, expect, request } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import hooks from '../../utils/hooks';
import { test as testWithCustomFixture } from './base';
import { test as test2 } from './base2';
// Setting a timeout
// test.setTimeout(30000);

test.describe('Some suite', () => {
  let page: Page;
  let loginPage: LoginPage;
  test.beforeAll(async ({ browser }) => {
    console.log(`URL ${process.env.URL}`);
    page = await browser.newPage();
    loginPage = hooks.beforeEach(page, LoginPage);
  });

  test.afterAll(async () => {
    await hooks.afterAll(page);
  });

  test(
    'Verify userID can be entered',
    {
      tag: ['@smoke'],
    },
    async () => {
      let userId = 'myusernam@gmail.com';
      await loginPage.Navigate();
      await loginPage.HoverOverAccountLogin();
      await loginPage.ClickPersonalBankingLogin();
      await loginPage.TypeUserId(userId);
      let actualValue = await loginPage.GetUserId();
      expect(actualValue).toBe(userId);
    }
  );

  test('Verify userId can be updated', async () => {
    const userId = 'update@test.com';
    await loginPage.ClearUserId();
    await loginPage.TypeUserId('update@test.com');
    let actualValue = await loginPage.GetUserId();
    expect(actualValue).toBe(userId);
  });

  test.skip('Test', async () => {
    page.on('dialog', async (alert) => {
      const text = alert.message();
      console.log(text);
      await alert.accept();
    });

    // drop down
    await page.selectOption('#select-demo', {
      label: 'Tuesday',
    });
    await page.selectOption('#multi-select', [
      {
        label: 'Texas',
      },
      {
        index: 2,
      },
      {
        value: 'Washington',
      },
    ]);

    // work with iframes
    const iframe = page.frameLocator('#test');
    await iframe.getByRole('textbox', { name: 'testName' }).click();

    // upload file
    const fileInput = page.locator('input[type="fiel"]');
    await fileInput.setInputFiles('.\file.pdf');
    // add an event listener in case there is a dialog box
    page.once('dialog', (dialog) => {
      dialog.accept();
    });
    // submit after in case it has it
    await page.getByText('Submit').click();

    // scroll
    const elementToScrollTo = page.locator('#id');
    await elementToScrollTo.scrollIntoViewIfNeeded();

    // iterate through elements
    const rows = await page.locator('tr').all();
    for (let row of rows) {
      await row.click();
    }

    // wait domconterloadd
    await page.goto('tes', {
      waitUntil: 'domcontentloaded',
    });

    await page.getByRole('button').click(); // Click triggers navigation.
    await page.waitForLoadState(); // The promise resolves after 'load' event.
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button').click(); // Click triggers a popup.
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
    console.log(await popup.title()); // Popup is ready to use.

    const responsePromise = page.waitForResponse(
      'https://example.com/resource'
    );
    await page.getByText('trigger response').click();
    const response = await responsePromise;
  });

  test.skip('Test API', async ({ request }) => {
    const setResponse = await request.put('url', {
      data: {
        items: [],
      },
    });
    expect(setResponse).toBeOK();
    expect(setResponse.status()).toBe(200);
    expect(await setResponse.json()).toEqual({ status: 'success' });
  });
});



testWithCustomFixture.describe('Some suite2', () => {
  // testWithCustomFixture.beforeAll(async ({ browser, loginPage }) => {
  //   console.log(`URL ${process.env.URL}`);
    // let page = await browser.newPage();
    // loginPage = hooks.beforeEach(page, LoginPage);
  // });
  // testWithCustomFixture.describe.configure({ mode: 'serial' });

  testWithCustomFixture.afterAll(async ({ page }) => {
    await page.close();
  });

  testWithCustomFixture(
    'using fixture and POM',
    {
      tag: '@test',
      annotation: {
        type: 'issue',
        description: 'Algo to say about what the test is for',
      },
    },
    async ({ loginPage }) => {
      let userId = 'myusernam@gmail.com';
      await loginPage.Navigate();
      await loginPage.HoverOverAccountLogin();
      await loginPage.ClickPersonalBankingLogin();
      await loginPage.TypeUserId(userId);
      let actualValue = await loginPage.GetUserId();
      expect(actualValue).toBe(userId);
    }
  );

  testWithCustomFixture(
    'Verify userId can be updated',
    async ({ loginPage }) => {
      const userId = 'update@test.com';
      await loginPage.ClearUserId();
      await loginPage.TypeUserId('update@test.com');
      let actualValue = await loginPage.GetUserId();
      expect(actualValue).toBe(userId);
    }
  );
});


testWithCustomFixture.describe('Some suite3', () => {
  let loginPageInstance;

  testWithCustomFixture('before', async ({ loginPage }) => {
    loginPageInstance = loginPage;
  });
  
  testWithCustomFixture.describe.configure({ mode: 'serial' });

  // testWithCustomFixture.afterAll(async ({ page }) => {
  //   await page.close();
  // });

  testWithCustomFixture(
    'using fixture and POM',
    {
      tag: '@test',
      annotation: {
        type: 'issue',
        description: 'Algo to say about what the test is for',
      },
    },
    async () => {
      let userId = 'myusernam@gmail.com';
      await loginPageInstance.Navigate();
      await loginPageInstance.HoverOverAccountLogin();
      await loginPageInstance.ClickPersonalBankingLogin();
      await loginPageInstance.TypeUserId(userId);
      let actualValue = await loginPageInstance.GetUserId();
      expect(actualValue).toBe(userId);
    }
  );

  testWithCustomFixture(
    'Verify userId can be updated',
    async () => {
      const userId = 'update@test.com';
      await loginPageInstance.ClearUserId();
      await loginPageInstance.TypeUserId('update@test.com');
      let actualValue = await loginPageInstance.GetUserId();
      expect(actualValue).toBe(userId);
    }
  );
});


test2.describe('E2E Test Suite', () => {
  test2.beforeEach(async ({ loginPage }) => {
    let userId = 'myusernam@gmail.com';
    await loginPage.Navigate();
    await loginPage.HoverOverAccountLogin();
    await loginPage.ClickPersonalBankingLogin();
    await loginPage.TypeUserId(userId);
    let actualValue = await loginPage.GetUserId();
  });

  test2('Validate Total Balance', async ({ otherPage }) => {
    await otherPage.Navigate();
  });

  test2('Validate Credit Available', async ({ otherPage }) => {
    await otherPage.Navigate();
  });

  test2('Validate Due Today', async ({ otherPage }) => {
    await otherPage.Navigate();
  });

  test2.afterAll(async ({ page }) => {
      await page.close();
  });
 
});