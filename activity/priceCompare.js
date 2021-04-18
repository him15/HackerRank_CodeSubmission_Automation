let puppeteer=require("puppeteer");
let fs=require("fs");
let links=["https://www.amazon.in","https://flipkart.com","https://paytmmall.com/"];
let pName=process.argv[2];
console.log("Before");

(async function(){
    try{
        let browserInstance=await puppeteer.launch({
            headless:false,
            defaultViewport: false,
            defaultViewport:null,
            args:["--start-maximized"]
        });
        getListingFromAmazon(links[0] , browserInstance , pName);



    }catch(err){
        console.log(err);
    }
})();


// output-> Top 5 matching product -> print name print
async function getListingFromAmazon(link , browserIntance , pName){
    let newTab= await browserIntance.newPage();
    await newTab.goto(link);
    await newTab.type("#twotabsearchtextbox" , pName , {delay: 200});
    await newTab.click("#nav-search-submit-button");

    let productArr=[];
    let priceArr=[];
    await newTab.waitForSelector(".sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20 h2" , {visible:true} );
    
    function browserRunConsoleFn(productSelector , priceSelector){
        let allH2=document.querySelectorAll(productSelector);
        let allPrices=document.querySelectorAll(priceSelector);
        let details=[];
        for(let i=0;i<5;i++){
            let oneItem=allH2[i].innerText;
            let onePrice=allPrices[i].innerText;
            details.push([
                oneItem , onePrice
            ])
        }
        return details;
    }

   let details= await newTab.evaluate(browserRunConsoleFn,".sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20 h2" ,".a-price-whole");
   console.log(details);


}

async function waitAndClick(selector , newTab){
    await newTab.waitForSelecto(selector , {visible : true});
    return newTab.click(selector);
}
