let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx','pptx' ,'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function dirCreator(orgpath){
    if(fs.existsSync(orgpath) == false){
        fs.mkdirSync(orgpath);
    }
}


let fs=require("fs");
let path=require("path");


// ---------------Create the Directory in the path-----------------------
let input=process.argv.slice(2);
let dirpath=input[0];



let orgFilePath=path.join(dirpath,"organize_file");
dirCreator(orgFilePath);

for(let key in types){
    let innerdirpath=path.join(orgFilePath,key);
    dirCreator(innerdirpath);
}
// ----------------------------------------------------

// step 2------  Traverse the folder -----------------------------

// checks wheather the file or not 
function isFileOrNot(dirPath){
    return fs.lstatSync(dirPath).isFile();
}


// return the list of all the folders and the files 
function listContent(dirPath){
    return fs.readdirSync(dirPath);
}


// 
function getDirectoryName(dirPath){
    let strArr=dirPath.split(".");
    let ext=strArr.pop();

    for(let key in types){
        // for(let dir in key){
        //     if(dir == ext){
        //         return dir;
        //     }
        // }
        for(let i=0;i< types[key].length;i++){
            if(types[key][i] == ext){
                return key;
            }
        }
    }
    return "others";
}
// others 
let otherPath = path.join(orgFilePath, "others");
dirCreator(otherPath);

function copyFileToFolder(src , dest){
    let orgFileName=path.basename(src);  // gives the file name which is to be copied
    let desFilePath=path.join(dest , orgFileName);

   fs.copyFileSync(src, desFilePath);

}

// module.exports={
//     organizeFn:organizeExecutor
// }


// main method to run

function organizeFile(dirPath){
    let isFile=isFileOrNot(dirPath);

    if(isFile == true){

        // find the folder name where the file have to pasted 
        let folderName = getDirectoryName(dirPath);
        let destFolder=path.join( orgFilePath , folderName );


        console.log(dirPath, "->", destFolder);

        // DirPath ->  F:\WebDev\1_file_system\AI Unit 1.pdf
        // orgFilePath + folderName ->  F:\WebDev\1_file_system\organized_file\documents 


        copyFileToFolder(dirPath , destFolder);
    }else{
        let content=listContent(dirPath);
        for(let i=0 ; i<content.length ; i++){
            let childPath=path.join(dirPath , content[i]);
            organizeFile(childPath);
        }
    }
}
organizeFile(dirpath);