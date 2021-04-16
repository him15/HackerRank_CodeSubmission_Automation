let puppeteer=require("puppeteer");
let {email,password}=require("../secrets");
let {codes}=require("./code");
console.log("before");

(async function(){
    
let browserinstance= await puppeteer.launch({
    headless:false, // it is to show in the screen 
    defaultViewport:null,
    args:["--start-maximized"]

})
let newTab= await browserinstance.newPage();
await newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");


    await newTab.type("#input-1",email,{delay : 200});
    await newTab.type("#input-2" , password, {delay:200});
    await newTab.click("button[data-analytics='LoginPassword']");
    await waitAndClick("a[id='base-card-1-link']" , newTab);
    await waitAndClick("a[data-attr1='warmup']" , newTab);
    let url=newTab.url();
    for(let i=0;i<codes.length;i++){
       await questionSolver(url , codes[i].soln , codes[i].qName , newTab);
    }

})();




// it is the function which take the code and question name then it solve that particular question
async function questionSolver(modulePageUrl , code , questionName , newTab){
   await newTab.goto(modulePageUrl);
            
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
            await newTab.evaluate(browserConsoleRunFn , questionName);
            await waitAndClick(".checkBoxWrapper" , newTab);
            await newTab.type(".custominput",code);
            await newTab.keyboard.down("Control");
            await newTab.keyboard.press("a");
            await newTab.keyboard.press("x");
            await newTab.click(".monaco-editor.no-user-select.vs");
            await newTab.keyboard.press("a");
            await newTab.keyboard.press("v");
            await newTab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled" );
            return newTab.keyboard.up("Control");
            
  
}

// function that is waiting for selector to display and applying the click on that selector
async function waitAndClick(selector , newTab) {
await  newTab.waitForSelector(selector, { visible: true });
return  newTab.click(selector);


}