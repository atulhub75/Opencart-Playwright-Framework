import { expect, test } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
import {RegisterPage} from "../pages/RegisterPage";
import fs from 'fs';
import { parse } from 'csv-parse/sync';


type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

const fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
const registerationData:RegData[]  = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
});


for (const user of registerationData) {
    test(`@register verify user is able to register ${user.firstName}`, async ({ page, baseURL }) => {
    
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        const registerPage: RegisterPage = await loginPage.navigateToRegisterPage();
        const isUserRegistered: boolean = await registerPage.registerUser(
            user.firstName,
            user.lastName,
            getRandomEmail(),
            user.telephone,
            user.password,
            user.subscribeNewsletter);
        expect(isUserRegistered).toBeTruthy();

    });
}


function getRandomEmail() : string{
    const randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}


// using normal hardcoded value

// test('verify user is able to login', async({page, baseURL})=>{
//     let loginPage=new LoginPage(page);
//     await loginPage.goToLoginPage(baseURL);
//     let registerPage:RegisterPage =await loginPage.navigateToRegisterPage();
//     let isUserRegister:boolean= await registerPage.registerUser('pratiksha1','margil','pratiks1@gmail.com','2388990066','test123','yes');
//     expect(isUserRegister).toBeTruthy();
// });
