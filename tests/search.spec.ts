
import { ResultsPage} from "../pages/ResultsPage";
import {test,expect} from "../fixtures/baseFitures";

const searchData=[
    {searchKey: 'macbook', resultscount:3},
    {searchKey: 'samsung', resultscount:2},
    {searchKey: 'imac', resultscount:1},
    {searchKey: 'canon', resultscount:1},
    {searchKey: 'dummy', resultscount:0}

];

for(const product of searchData){

test(`@search @sanity verify product search ${product.searchKey}`,async({homePage})=>{

 const resultsPage:ResultsPage=await homePage.doSearch(product.searchKey);
 expect(await resultsPage.getSearchResultsCount()).toBe(product.resultscount);

});
}


