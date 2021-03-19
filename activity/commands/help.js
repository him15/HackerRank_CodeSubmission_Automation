
function helpExecutor(){
        console.log(`list of all command :
                    1. view <dir-name> --tree
                    2. view <dir-name> --flat
                    3. organize <dir-name>/-
                    4. help
                    `);
        
}


module.exports={
    helpFn : helpExecutor // dont use the bracket because it will be called two times 
}