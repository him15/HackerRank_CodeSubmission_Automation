let puppeteer=require("puppeteer");
let {email,password}=require("../secrets");
let {codes}=require("./code");
console.log("before");
let gtab; // global tab
//open the browser
let browserPromise=puppeteer.launch({
    headless:false, // it is to show in the screen 
    defaultViewport:null,
    args:["--start-maximized"]

})

browserPromise.then(function(browserinstance){
    let newTabPromise=browserinstance.newPage();
    return newTabPromise;
}).then(function(newTab){
    let loginPageWillbeOpenedPromise=newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    gtab=newTab;
    return loginPageWillbeOpenedPromise;
  // email typing  
}).then(function(){
    let emailWillBeTypedPromise=gtab.type("#input-1",email,{delay : 200});
    return emailWillBeTypedPromise;
    // password typing
}).then(function(){
    let passwordWillBeTypedPromise=gtab.type("#input-2" , password, {delay:200});
    return passwordWillBeTypedPromise;
})
// login
.then(function () {
    let loginPageWillBeClickedpromise = gtab.
        click("button[data-analytics='LoginPassword']");
    return loginPageWillBeClickedpromise;
})
// Preparation Kit
.then(function(){
    // let preparationKitWillBeClickedPromise=gtab.click("a[id='base-card-1-link']");
    // The upper line of code will show error becoz this then is waiting for the click . when login btn jis clicked 
    // the upper line will be run and it will show the element not found error 
    // we also have to wait for page changing
    let preparationKitClick=waitAndClick("a[id='base-card-1-link']");
    return preparationKitClick;
    
}).then(function(){
    console.log(gtab.url());
    let warmupClick=waitAndClick("a[data-attr1='warmup']");
    return warmupClick;
    
}).then(function(){
    console.log(gtab.url());
    return gtab.url(); // return url of the current page

}).then(function(url){
    console.log(url);
    let questionObj=codes[0];
    questionSolver(url , questionObj.soln , questionObj.qName );
})

.catch(function(err){
    console.log(err);
})



// it is the function which take the code and question name then it solve that particular question
function questionSolver(modulePageUrl , code , questionName){
    return new Promise(function (resolve , reject ){
        //--------logic-----
            // visit the page
            let reachedPageUrlPromise = gtab.goto(modulePageUrl);
            
            reachedPageUrlPromise.then(function(){
                // question name -> appear -> visit
            // page h4 -> matching h4 -> click
            function browserConsoleRunFn(questionName){ // this function will run on the browser console with the help of Evaluate method
                let allH4Element = document.querySelectorAll("h4");
                let textArr=[]
                    // this for loop will create array of all the questions  
                for(let i=0;i<allH4Element.length;i++){
                    let myQuestion = allH4Element[i].innerText.split("\n")[0];
                    textArr.push(myQuestion);
                }

                // we will find the index in the textArr of the question then we click on that particular question
                let idx=textArr.indexOf(questionName);
                console.log(idx);
                allH4Element[idx].click();

            }
            let pageClickedPromise=gtab.evaluate(browserConsoleRunFn , questionName);
            return pageClickedPromise;
            // read code 
            // then copy 
            // then paste 
            // them submit the code  
            })
            .then(function(){
                resolve();
            })
            
    })
}

// function that is waiting for selector to display and applying the click on that selector
function waitAndClick(selector) {
    return new Promise(function (resolve, reject) {
        let selectorWaitPromise = gtab.waitForSelector(selector,
            { visible: true });
        selectorWaitPromise
            .then(function () {
                let selectorClickPromise = gtab.click(selector);
                return selectorClickPromise;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    })
}