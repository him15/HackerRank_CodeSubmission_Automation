let fs=require("fs");
let arr=["f1.txt" , "f2.txt" , "f3.txt" ];
console.log("Before");

let data;

// async is compulsary -> inside the function 
async function fn(){

    try{
        for(let i=0;i<arr.length;i++){
            data=await fs.promises.readFile(arr[i]);
            console.log(data+" ");
        }
    }catch(err){
        console.log(err);
    }
    
}

fn();
console.log("After");