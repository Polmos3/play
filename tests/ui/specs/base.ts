import {test as base } from "@playwright/test"
import LoginPage from "../pages/LoginPage";
import OtherPage from "../pages/OtherPage";
type MyFixture ={
    loginPage:LoginPage,
    otherPage:OtherPage
};

export const test = base.extend<MyFixture>({
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page));
    },
    otherPage:async({page}, use)=>{
        await use(new OtherPage(page));
    },
})