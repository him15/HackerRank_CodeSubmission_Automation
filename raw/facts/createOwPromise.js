let fs=require("fs");
function promiseReadFile(filePath){
    return new Promise(function (resolve , reject){ // wrapping in the promises
        // do your code here
        fs.readFile(filePath,function cb(err, data){
            if(err){
                // if the work fails then call the resolve function
                resolve(err);
            }else{
                // if the work successed then call the reject function
                reject(data);
            }
        });
    });
}

// User 
let fReadPromise=promiseReadFile("f1.txt");
console.log(fReadPromise);
fReadPromise.then(function (data){
    console.log("data is -> "+data);
})
fReadPromise.catch(function(err){
    console.log("Error -> "+err);
})