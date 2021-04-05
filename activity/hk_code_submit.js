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
}).then(function(){
    let loginPageWillBeClickedPromise=gtab.click("button[data-analytics='LoginPassword']");

    // we have to wait for both the promises until the page is loaded
    let combinePromises=Promise.all([loginPageWillBeClickedPromise,
        gtab.waitForNavigation({waitUntil:"networkidle0"})]);   
    return combinePromises;
}).then(function(){
    // let preparationKitWillBeClickedPromise=gtab.click("a[id='base-card-1-link']");
    // The upper line of code will show error becoz this then is waiting for the click . when login btn jis clicked 
    // the upper line will be run and it will show the element not found error 
    // we also have to wait for page changing
    let preparationKitWillBeClickedPromise=gtab.click("a[id='base-card-1-link']");
    let preparationKitCombinedPromises=Promise.all([preparationKitWillBeClickedPromise
        ,gtab.waitForNavigation({waitUntil:"networkidle0"})]);
    return preparationKitCombinedPromises;
    
}).then(function(){
    let warmupWillBeClickedPromise=gtab.click(".ui-card.ui-layer-3.active-card");
    let warmupClickedCombinedPromise=Promise.all([warmupWillBeClickedPromise ,
        gtab.waitForNavigation({waitUntil:"networkidle0"})]);
        return warmupClickedCombinedPromise;
}).then(function(){

}).catch(function(err){
    console.log("Error AAYA Re :- ",err);
})