let fs=require("fs");

console.log("Before");
// let f1p=fs.promises.readFile("f1.txt");
// let f2p=fs.promises.readFile("f2.txt");
// let f3p=fs.promises.readFile("f3.txt");

// f1p.then(cb);
// f2p.then(cb);
// f3p.then(cb);


// function cb(data){
//    console.log("data -> "+ data);
// }

// -----------------USING FOR LOOP----------------

let fileArr=[ "f1.txt" , "f2.txt" , "f3.txt" ];

for(let i=0;i<fileArr.length;i++){
    let frp=fs.promises.readFile(fileArr[i]);
    frp.then(cb);

}

function cb(data){
    console.log(data+"");
}