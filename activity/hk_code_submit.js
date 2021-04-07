let puppeteer=require("puppeteer");
let {email,password}=require("../secrets");

console.log("before");
let gtab; // global tab
//open the browser
let browserPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--incognito","--start-maximized"]

})

browserPromise.then(function(browserinstance){
    let newTabPromise=browserinstance.newPage();
    return newTabPromise;
}).then(function(newTab){
    let loginPageWillbeOpenedPromise=newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    gtab=newTab;
    return loginPageWillbeOpenedPromise;
}).then(function(){
    let emailWillBeTypedPromise=gtab.type("#input-1",email,{delay : 200});
    return emailWillBeTypedPromise;
}).then(function(){
    let passwordWillBeTypedPromise=gtab.type("#input-2" , password, {delay:200});
    return passwordWillBeTypedPromise;
})
// login
.then(function(){
    let loginPageClick=waitAndClick("button[data-analytics='LoginPassword']");
     // we have to wait for both the promises until the page is loaded
     
     // Now we have to wait for the UI to show on the Screen - Sometimes it is shown late in screen when the network is little slow.
    return loginPageClick;
})
// Preparation Kit
.then(function(){
    // let preparationKitWillBeClickedPromise=gtab.click("a[id='base-card-1-link']");
    // The upper line of code will show error becoz this then is waiting for the click . when login btn jis clicked 
    // the upper line will be run and it will show the element not found error 
    // we also have to wait for page changing
    let preparationKitClick=waitAndClick("a[id='base-card-1-link']");
    return preparationKitClick;
    
}) // warm Up Challenge
.then(function(){
    let warmupClick=waitAndClick("a[data-attr1='warmup']");
    return warmupClick;

}) // Reach to the Question
.then(function(){
    let questionClick=waitAndClick(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
    return questionClick;

}).catch(function(err){
    console.log("Error AAYA Re :- ",err);
})


// function that is waiting for selector and applying the click on that selector
function waitAndClick(selector){
    return new Promise(function(resolve,reject){
        let selectorWaitPromises=gtab.waitForSelector(selector);
        selectorWaitPromises.then(function(){
            let clickPromise=gtab.click(selector);
            return clickPromise;
        })
        selectorWaitPromises.then(function(){
            resolve();
        })
        selectorWaitPromises.then(function(){
            reject();
        })
    })
}