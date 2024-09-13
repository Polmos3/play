const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { OtherPage } = require('../pages/OtherPage');

exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    otherPage: async ({ page }, use) => {
        await use(new OtherPage(page));
    },
});
exports.expect = base.expect;