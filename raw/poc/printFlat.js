// file system  -> node js module 
// google 

// require function is the easiest way to include modules that exist in separate files
let fs=require("fs");
let path = require("path");


function isFileChecker(dirPath){  // check the path is file or not 
    return fs.lstatSync(dirPath).isFile(); // return true if file or else return false in folder 
}

function readContent(dirPath){ // read the content of the directory path  
    return fs.readdirSync(dirPath); // return the content in the form of array ex: all the folder name of the dirPath
}




// print all the folder in the flat manner 
function viewFlat(dirPath){
    // dirPath  -> file/ folder 

    let isFile = isFileChecker(dirPath);  // check the file or not 

    // 
    if(isFile == true){
        console.log(dirPath +"*");
    }
    
    else{
        // directory 
        // console.log
        //print path 
        console.log(dirPath);
        // get Childrens

        let Childrens = readContent(dirPath); // returns array of folder name

        // call from view flat 
        for(let i =0;i<Childrens.length;i++){
            viewFlat(dirPath + "/" + Childrens[i]);
        }
        // console.log("children : " , childrens[i]);
    }

   
}




// print in Tree form 
function viewTree(dirPath , indent ){
    // dirPath  -> file/ folder 

    let isFile = isFileChecker(dirPath);  // check the file or not 

    // 
    if(isFile == true){
        console.log(indent, path.basename(dirPath + "*"));
    }
    
    else{
         // directory 
        // console.log
        //print path 
        console.log(indent ,path.basename(dirPath)); // base name means return the last value from the whole line 
        // get Childrens

        let Childrens = readContent(dirPath); // returns array of folder name

        // call from view flat 
        for(let i =0;i<Childrens.length;i++){
            viewTree( path.join( dirPath , Childrens[i]) , indent +"\t" );
        }
        // console.log("children : " , childrens[i]);
    }

   
}



viewTree("F:\\WebDev\\1_file_system_13feb" , "");