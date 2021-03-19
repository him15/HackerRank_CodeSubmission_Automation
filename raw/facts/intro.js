console.log("Hello : pp");

let a;
// dynamic type value


a=10;
a="Hi i am a String";  // only string // no char 
a=true;
a=10.1;
a=null;
console.log("a is " , a);
console.log("--------------------------------------");


//prime number
let isPrime=true;
let num=23;
for(let i=2;i*i<=num;i++){
    if(num%i == 0){
        isPrime=false;
    }
}

if(isPrime){
    console.log("prime");
}else{
    console.log("Not Prime");
}


