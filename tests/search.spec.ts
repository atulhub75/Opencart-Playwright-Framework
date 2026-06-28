
import { ResultsPage} from "../pages/ResultsPage";
import {test,expect} from "../fixtures/baseFitures";

let searchData=[
    {searchKey: 'macbook', resultscount:3},
    {searchKey: 'samsung', resultscount:2},
    {searchKey: 'imac', resultscount:1},
    {searchKey: 'canon', resultscount:1},
    {searchKey: 'dummy', resultscount:0}

]

for(let product of searchData){

test(`@search @sanity verify product search ${product.searchKey}`,async({homePage})=>{

 let resultsPage:ResultsPage=await homePage.doSearch(product.searchKey);
 expect(await resultsPage.getSearchResultsCount()).toBe(product.resultscount);

})
}


