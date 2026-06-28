
import { ResultsPage } from "../pages/ResultsPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
import {test,expect} from "../fixtures/baseFitures";



let search=[
    {searchKey:'macbook', productName: 'MacBook Pro',imagecount:4},
    {searchKey:'macbook', productName: 'MacBook Air',imagecount:4},
    {searchKey:'samsung', productName: 'Samsung Galaxy Tab 10.1',imagecount:7},
    
]

for(let product of search){
test(`verify product header ${product.productName}`,{tag:['@product','@sanity','@regression']},async({homePage})=>{

 let resultsPage:ResultsPage= await homePage.doSearch(product.searchKey);
 let productInfoPage:ProductInfoPage= await resultsPage.selectProduct(product.productName);

  expect(await productInfoPage.getProductHeader()).toBe(product.productName);

})
}


for(let product of search){
test(`verify product header ${product.productName} : ${product.imagecount}`,{tag:['@product','@sanity']},async({homePage})=>{

 let resultsPage:ResultsPage= await homePage.doSearch(product.searchKey);
 let productInfoPage:ProductInfoPage= await resultsPage.selectProduct(product.productName);

  expect( await productInfoPage.getProductImagesCount()).toBe(product.imagecount);

})
}


test(`verify product MetaData `,async({homePage})=>{

 let resultsPage:ResultsPage= await homePage.doSearch('macbook');
 let productInfoPage:ProductInfoPage= await resultsPage.selectProduct('MacBook Pro');
 let actulProductFullDetails= await productInfoPage.getProductDetails();

 expect.soft(actulProductFullDetails.get('header')).toBe('MacBook Pro');
  expect.soft(actulProductFullDetails.get('Brand')).toBe('Apple');
 expect.soft(actulProductFullDetails.get('Product Code')).toBe('Product 18');
 expect.soft(actulProductFullDetails.get('Reward Points')).toBe('800');
  expect.soft(actulProductFullDetails.get('Availability')).toBe('Out Of Stock');

})

test(`verify product Price details`,async({homePage})=>{

 let resultsPage:ResultsPage= await homePage.doSearch('macbook');
 let productInfoPage:ProductInfoPage= await resultsPage.selectProduct('MacBook Pro');
 let actulProductFullDetails= await productInfoPage.getProductDetails();

 expect.soft(actulProductFullDetails.get('header')).toBe('MacBook Pro');
  expect.soft(actulProductFullDetails.get('price')).toBe('$2,000.00');
 expect.soft(actulProductFullDetails.get('extraprice')).toBe('$2,000.00');

})

