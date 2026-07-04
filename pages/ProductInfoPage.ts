import { Page,Locator } from "@playwright/test";
import {ElementUtil} from "../utils/ElementUtil";

export class ProductInfoPage {

    private readonly page:Page;
    private readonly eleUtil;
    private readonly header: Locator;
    private readonly imageCount: Locator;
    private readonly productMetaData: Locator;
    private readonly productPriceData: Locator;

    private readonly productMap=new Map<string, string|number |null>();


    
    constructor(page: Page) {
        this.page= page;
        this.eleUtil= new ElementUtil(page);
        this.header=page.locator('h1');
        this.imageCount=page.locator('div#content img');
        this.productMetaData=page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[1]/li`);
        this.productPriceData=page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[2]/li`);
        
    }

    async getProductHeader() :Promise<string>{
       const header= await this.eleUtil.getInnerText(this.header);
       console.log('product header :'+header);
       return header.trim();
    }

    async getProductImagesCount() :Promise<number>{
        await this.eleUtil.waitForElementVisible(this.imageCount);
       const imagesCount= await this.imageCount.count();
       console.log(`total number of images for ${await this.getProductHeader()} ==> ${imagesCount}`);
       return imagesCount;
    }


    async getProductDetails() :Promise<Map<string,string|number|null>>{
       this.productMap.set('header',await this.getProductHeader());
       this.productMap.set('ImageCount', await this.getProductImagesCount());
       await this.getProductMetaData();
       await this.getProductPricingData();

       console.log(`full product detail for product: ${await this.getProductHeader()}`);
       await this.printProductDetails();
       return this.productMap;
    }


    private async printProductDetails(){
        for(const [key, value] of this.productMap){
            console.log(key,value);
        }
    }


    private async getProductMetaData(){
      const productMetaData:string[]=await this.productMetaData.allInnerTexts();

      for(const meta of productMetaData){
        const metadata:string[]= meta.split(':');
          const metaKey= metadata[0].trim();
          const metaValue= metadata[1].trim();
          this.productMap.set(metaKey,metaValue);
      }

    }

    //$602.00
     //Ex Tax: $500.00
     private async getProductPricingData(){
      const productPricing:string[]=await this.productPriceData.allInnerTexts();
      const productPrice=productPricing[0].trim();
      const productExTax= productPricing[1].split(':')[1].trim();

      this.productMap.set('price',productPrice);
      this.productMap.set('extraprice',productExTax);
      
    }


}