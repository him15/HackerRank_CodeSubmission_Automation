let fs=require("fs");

console.log("before")
let promise=fs.promises.readFile("f1.txt");
console.log("Initial stage",promise);

promise.then(function(data){
    console.log("last stage",data);
});

promise.catch(function(err){
    console.log("error",err);
});

console.log("After");