// array is the collection of anything 

let arr=[
1,
1.1,
"string",
null,
true,
{
    name:"Himanshu",
    lastname : " Shivhare"
}

];

console.log(arr);
arr[95]="we can add at random idx"; // can add at random idx it add like a key value pair
arr["invalid"]="any thing";
arr["invalid 1"]="any thing 1";
arr["invalid 2"]="any thing 2";
arr["invalid 3"]="any thing 3";
for(let key in arr){
    // console.log("Key : ", key , "| value : " , arr[key]);
}

// console.log(arr.length);
// console.log(arr[25]);


// ```````````````````````````````````````````
//const 
const a=[1,2,3,4,5];
a.unshift(0);
a.unshift("this fun add this in start");

console.log(a);
console.log(" ```````````````````````````````````````````` ");
// addLast -> Push
// add first -> unshift 

// removeLast ->Pop
// arr.pop();
// console.log(arr);
// removeFirst -> shift
// gives copy of sliced array 


// a.splice(0,3); // ye 0th index se 3 element remove kar dega 

console.log(a);





// console.log("`````````````````````````````````````````````````````````````````````");

// // Setup
// var contacts = [
//     {
//         "firstName": "Akira",
//         "lastName": "Laine",
//         "number": "0543236543",
//         "likes": ["Pizza", "Coding", "Brownie Points"]
//     },
//     {
//         "firstName": "Harry",
//         "lastName": "Potter",
//         "number": "0994372684",
//         "likes": ["Hogwarts", "Magic", "Hagrid"]
//     },
//     {
//         "firstName": "Sherlock",
//         "lastName": "Holmes",
//         "number": "0487345643",
//         "likes": ["Intriguing Cases", "Violin"]
//     },
//     {
//         "firstName": "Kristian",
//         "lastName": "Vos",
//         "number": "unknown",
//         "likes": ["JavaScript", "Gaming", "Foxes"]
//     }
// ];


// function lookUpProfile(name, prop){
// // Only change code below this line
//     for(let i in contacts){
//         var f=contacts[i].name;
//         if(f== name ){
//             return contacts[i].prop;
//         }

//     }


// }
// console.log(lookUpProfile("Akira", "likes"));

