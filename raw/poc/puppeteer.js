let puppeteer = require("puppeteer");

console.log("Before");
let browserWillOpenPromise=puppeteer.launch({  // method to open the browser and it will return the promise
    headless:false // to show that the browser is opened
})
// console.log(browserWillOpenPromise); // show pending becoz it is promise 
// browserWillOpenPromise.then(function(browserinstance){
//     let newPagePromise=browserinstance.newPage();
//          newPagePromise.then(function(newPage){  // new page method open the new tab in the browser
//             console.log("new Page is OPened");

//             let urlPageOpened=newPage.goto("https://www.google.com/");
//             urlPageOpened.then(function(){
//                 console.log("Url is opened in the page!");
//             })

//         })
// })
// the upper given code is less readable so we do by chaning it

// -----------------Alternate way to do the same work [By chaining]--------------

browserWillOpenPromise.then(function(browserinstance){
    let newPage=browserinstance.newPage();
    return newPage;
}).then(function(newPage){
    console.log("new Page is Opened");
    let newUrlPromise=newPage.goto("https://www.google.com/");
    return newUrlPromise;
}).then(function(){
    console.log("Google is Opened in new Page");
}).catch(function(err){
    console.log("Error Aaya Re :- ",err);
})