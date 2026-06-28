import { Page,Locator } from "@playwright/test";
import {ElementUtil} from "../utils/ElementUtil";
import { HomePage } from "../pages/HomePage";
import { ProductInfoPage } from "../pages/ProductInfoPage";

export class ResultsPage {

    private readonly page:Page;
    private readonly eleUtil;
    private readonly result: Locator;
    


    constructor(page: Page) {
        this.page= page;
        this.eleUtil= new ElementUtil(page);
        this.result= page.locator('.product-thumb');
        
    }

    async getSearchResultsCount() :Promise<number>{
       return await this.result.count();
    }

    async selectProduct(productName:string) :Promise<ProductInfoPage>{
       console.log('====product Name===='+productName);
       await this.eleUtil.click(this.page.getByRole('link', {name:`${productName}`}));
       return new ProductInfoPage(this.page)
    }

   

}