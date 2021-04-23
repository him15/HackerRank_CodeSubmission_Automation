let puppeteer=require("puppeteer");
let fs=require("fs");
let pName=process.argv[2];
console.log("Before");

// no. of videos 
// views 
// watch time 
// list of videos->  In Excel 
(async function(){
    try{
        let browserInstance=await puppeteer.launch({
            headless:false,
            defaultViewport: false,
            defaultViewport:null,
            args:["--start-maximized"]
        });
        let newPage= await browserInstance.newPage();
        await newPage.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");

        function consoleFn(){
            let arr=document.querySelectorAll("#stats.style-scope.ytd-playlist-sidebar-primary-info-renderer .style-scope.ytd-playlist-sidebar-primary-info-renderer");
            let newArr=[];
            newArr.push(arr[0].innerText , arr[1].innerText);
            return newArr;
        }
        let data=await newPage.evaluate(consoleFn);
        console.log("Views -> " + data[0]);
        console.log("No. of Videos -> " + data[1]);


        
        function getStat(durationSel , timeSel){
            let titleElemArr=document.querySelectorAll(durationSel);
            let dElementArr=document.querySelectorAll(timeSel);

            let NameNdDurArr=[];
            for(let i=0;i<titleElemArr.length;i++){
                let duration=dElementArr[i].innerText;
                let title=titleElemArr[i].innerText;
                NameNdDurArr.push(duration , title);
            }
            return NameNdDurArr;
        }



        // #content.style-scope.ytd-playlist-video-renderer  -> get the whole div

    }catch(err){
        console.log(err);
    }
})();