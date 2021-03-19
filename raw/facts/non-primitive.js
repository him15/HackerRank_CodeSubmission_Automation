// funcion array object

// function hello(param){
//     console.log("Gretting everyone with" , param);

//     // return "returned value";
// }

// hello(" Hiii ");
// let rVal=hello("Hello");
// console.log(rVal);

// ***********************
// object   key:value
//it is key value pairs
let obj={
    name:"Himanshu",
    lastName:" Shivhare",
    address:{
        city:"Greater Noida",
        state:"UP"
    },
    isAvenger:true,
    age:22,
    movies:["money heist","got","friends"],
    sayhi: function(param){
        console.log(" cap say " , param);
        return "returned message";
    }


}
// console.log("address object" , obj);
// console.log("address object" , obj.address);
// console.log("address object" , obj.address.state);
// console.log("address object" , obj.movies[1]);
console.log("address object" , obj.sayhi("i m him"));


// ````````````````````````````````````````````````````

console.log(obj);
console.log("``````````````````````````````````````````");
obj.friends=["abc" , "xyz" , "qwe"];
console.log("````````````````````````````````````````````");
console.log(obj);

// for in loop 
for(let key in obj){

    console.log("key : " , key , "| value : " , obj[key]);

}

let key="state";
console.log(obj.address[key]);




