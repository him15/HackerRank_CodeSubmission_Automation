// command ->
// view --tree , -- flat
    // organise -> same folder , multiple folder 
    // help

// [node , myclic.js , view , dirName , mode]
// node myclic.js organize  -/folder name


// isko hmne eek type ae static bana diya hai warna hame object ke name is call karna padta 
let {helpFn}=require("./commands/help");
let {organizeFn}=require("./commands/organize");
let {viewFn}=require("./commands/view");


let input = process.argv.slice(2);
let cmd = input[0];

switch(cmd){
    case "view":
        viewFn();
        break;
    case "organize":
        organizeFn();
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("wrong command !");
}