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
        let videoCount= Number(data[0].split(" ")[0]); 
        console.log("No. of Videos -> " + videoCount );
        console.log("Views -> " + data[1].split(" ")[0]);

        let pCurrentVideoCount=await scrollBottom(newPage , "#video-title");
        console.log(pCurrentVideoCount+"------------"+videoCount);

        while( videoCount-50 > pCurrentVideoCount ){
            pCurrentVideoCount=await scrollBottom(newPage , "#video-title");
        }

        let timeNdDurArray = await newPage.evaluate(getStat , "span.style-scope.ytd-thumbnail-overlay-time-status-renderer" 
                              ,"#video-title" ); 
        console.table(timeNdDurArray);
        
        function getStat(durationSel , titleSel){
            let dElementArr=document.querySelectorAll(durationSel);
            let titleElemArr=document.querySelectorAll(titleSel);

            let NameNdDurArr=[];
            for(let i=1;i<dElementArr.length;i++){
                let duration=dElementArr[i].innerText;
                let title=titleElemArr[i].innerText;
                NameNdDurArr.push({duration,title});
            }
            return NameNdDurArr;
        }
        // #content.style-scope.ytd-playlist-video-renderer  -> get the whole div
    }catch(err){
            console.log(err);
        }
    })();

async function scrollBottom(page , title ){
    function getLengthConsoleFn(title){
        window.scrollBy(0, window.innerHeight);
        let titleElementArr= document.querySelectorAll(title);
        console.log("---------------Hello -----------");
        console.log(titleElementArr.length);
        return titleElementArr.length;
    }
    return page.evaluate(getLengthConsoleFn , title);
}