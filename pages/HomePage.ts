import { Page,Locator } from "@playwright/test";
import {ElementUtil} from "../utils/ElementUtil";
import { LoginPage} from "../pages/LoginPage";
import { ResultsPage } from "../pages/ResultsPage";

export class HomePage {

     readonly page:Page;
    private readonly eleUtil;
    private readonly loginLink:Locator;
    private readonly logoutLink:Locator;
    private readonly search:Locator;
     private readonly searchIcon:Locator;


    constructor(page: Page) {
        this.page= page;
        this.eleUtil= new ElementUtil(page);
        this.logoutLink= page.getByRole('link', { name: 'Logout' });
        this.loginLink= page.getByRole('link', { name: 'Login' });
        this.search= page.getByRole('textbox', { name: 'Search' });
        this.searchIcon= page.locator('.btn.btn-default.btn-lg');
 
    }

    async isUserLoggedIn():Promise<boolean>{
        return await this.eleUtil.isVisible(this.logoutLink,0);
    }

    async logout() : Promise<LoginPage>{
        await this.eleUtil.click(this.logoutLink,{timeout:5000},1);
        await this.eleUtil.click(this.loginLink,{timeout:4000},1);
        return new LoginPage(this.page);
    }
  
    async doSearch(searchKey:string) :Promise<ResultsPage> {
     console.log(`search key: ${searchKey}`);
     await this.eleUtil.fill(this.search,searchKey);
     await this.eleUtil.click(this.searchIcon);
     return new ResultsPage(this.page);

    }

}