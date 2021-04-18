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
        getListingFromFlipkart(links[1] , browserInstance , pName);
        getListingFromPaytmMall(links[2] , browserInstance , pName);

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
   console.table(details);

}

async function getListingFromFlipkart(link , browserInstance , pName){
    let newTab=await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("._3704LK" , pName , {delay:200});
    await newTab.click(".L0Z3Pu");
    await newTab.click(".L0Z3Pu");
    await newTab.waitForSelector("._4rR01T" , {visible:true});

    function consoleRunFn(productSelector , priceSelector){
        let allProducts=document.querySelectorAll(productSelector);
        let allPrices=document.querySelectorAll(priceSelector);
        let details=[];

        for(let i=0;i<5;i++){
            let oneProduct=allProducts[i].innerText;
            let onePrice=allPrices[i].innerText;
            details.push([
                oneProduct , onePrice
            ])
        }
        return details;
    }
    let details=await newTab.evaluate(consoleRunFn , "._4rR01T" , "._30jeq3._1_WHN1");
    console.log("```````````````````````````````````````````````````");
    console.table(details)       

}


async function getListingFromPaytmMall(link , browserInstance , pName){
    let newTab=await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("#searchInput" , pName , {delay:200});
    await newTab.keyboard.press("Enter" , {delay:200});
    await newTab.waitForSelector(".UGUy" , {visible:true});

    function consoleRunFn(productSelector , priceSelector){
        let allProducts=document.querySelectorAll(productSelector);
        let allPrices=document.querySelectorAll(priceSelector);
        let details=[];

        for(let i=1;i<6;i++){
            let oneProduct=allProducts[i].innerText;
            let onePrice=allPrices[i].innerText;
            details.push([
                oneProduct , onePrice
            ])
        }
        return details;
    }
    let details=await newTab.evaluate(consoleRunFn , ".UGUy" , "._1kMS");
    console.log("------PayTM-----------Compare-------");
    console.table(details)       

}
