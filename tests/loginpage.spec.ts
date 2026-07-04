import { LoginPage } from '../pages/LoginPage';

import {test,expect} from "../fixtures/baseFitures";

test('verify valid Login @login',async({homePage})=>{
    await expect(homePage.page).toHaveTitle('My Account');
});

test('verify Invalid Login @wip',async({page,baseURL})=>{
 const loginPage=new LoginPage(page);
 await loginPage.goToLoginPage(baseURL);
 await loginPage.doLogin('play20@gmail.com','admin123');
 const errorMsg=await loginPage.getInvalidLoginMessage();
 expect(errorMsg).toContain('Warning: No match for E-Mail Address and/or Password.');
});
