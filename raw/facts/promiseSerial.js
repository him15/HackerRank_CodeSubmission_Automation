let fs=require("fs");

// let frp1=fs.promises.readFile("f1.txt");
// frp1.then(cb);

// function cb(data){
//     console.log("data is -> "+data);
//     let frp2=fs.promises.readFile("f2.txt");
//     frp2.then(cb2);

// }

// function cb2(data){
//     console.log("data -> "+data);
//     let frp3=fs.promises.readFile("f3.txt");
//     frp3.then(cb3);
// }

// function cb3(data){
//     console.log("data -> "+data);
// }

//-----Problem in upper code is that for every then we have to attach catch 

// Improved Version

// let frp1=fs.promises.readFile("f1.txt");
// frp1.then(cb1).then(cb2).then(cb3).catch(function(err){console.log(err);})

// function cb1(data){
//     console.log("content -> "+ data);
//     let frp2=fs.promises.readFile("f2.txt");
//     return frp2;
// }

// function cb2(data){
//     console.log("content -> "+ data);
//     let frp3=fs.promises.readFile("f3.txt");
//     return frp3;
// }
// function cb3(data){
//     console.log("content -> "+ data);
// }


// -----------Using For Loop-----------------

let arr=["f1.txt" , "f2.txt" , "f3.txt"];
console.log("Before");

let frp=fs.promises.readFile(arr[0]);

for(let i=1;i<arr.length;i++){
    frp=frp.then(function (data){
        console.log("data -> "+ data);
        return fs.promises.readFile(arr[i]);
    });
}
frp.then(function(data){
    console.log("data -> "+data);
});
console.log("After");