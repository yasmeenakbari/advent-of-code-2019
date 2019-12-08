const fs = require('fs');
const readline = require('readline')

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function executeInstructions(inputs){

    let i = 0;
    while(true){
        let instruction = parseInt(inputs[i]).toString().split('').map(Number);

        let opcode = instruction[instruction.length-1];
        if (instruction.length > 1){
            opcode = opcode + (instruction[instruction.length-2]*10);
        }
    
        if (opcode == 99){
            break;
        }
        if (opcode == 1){
            let arg1 = instruction[instruction.length-3] === 1 ? inputs[i+1] : inputs[parseInt(inputs[i+1])];
            let arg2 = instruction[instruction.length-4] === 1 ? inputs[i+2] : inputs[parseInt(inputs[i+2])];
            let arg3 = parseInt(inputs[i+3]);
            inputs[arg3] = parseInt(arg1) + parseInt(arg2);
            i = i + 4;
        }
        else if (opcode == 2){
            let arg1 = instruction[instruction.length-3] === 1 ? inputs[i+1] : inputs[parseInt(inputs[i+1])];
            let arg2 = instruction[instruction.length-4] === 1 ? inputs[i+2] : inputs[parseInt(inputs[i+2])];
            let arg3 = parseInt(inputs[i+3]);
            inputs[arg3] = parseInt(arg1) * parseInt(arg2);
            i = i + 4;
        }
        else if (opcode == 3){
            // Opcode 3 takes a single integer as input and saves it to the position given by its only parameter
            let arg1 = parseInt(inputs[i+1]);
            inputs[arg1] = await askQuestion("Please enter an integer: ");
            i = i + 2;
        }
        else if (opcode == 4){
            // Opcode 4 outputs the value of its only parameter
            let arg1 = parseInt(inputs[i+1]);
            console.log("Opcode 4 output: ", inputs[arg1]);
            i = i + 2;
        }
        else if (opcode == 5){
            let arg1 = instruction[instruction.length-3] === 1 ? inputs[i+1] : inputs[parseInt(inputs[i+1])];
            let arg2 = instruction[instruction.length-4] === 1 ? inputs[i+2] : inputs[parseInt(inputs[i+2])];
            if (parseInt(arg1) !== 0){
                i = parseInt(arg2);
            }
            else {
                i = i + 3;
            }
        }
        else if (opcode == 6){
            let arg1 = instruction[instruction.length-3] === 1 ? inputs[i+1] : inputs[parseInt(inputs[i+1])];
            let arg2 = instruction[instruction.length-4] === 1 ? inputs[i+2] : inputs[parseInt(inputs[i+2])];
            if (parseInt(arg1) === 0){
                i = parseInt(arg2);
            }
            else {
                i = i + 3;
            } 
        }
        else if (opcode == 7){
            let arg1 = instruction[instruction.length-3] === 1 ? inputs[i+1] : inputs[parseInt(inputs[i+1])];
            let arg2 = instruction[instruction.length-4] === 1 ? inputs[i+2] : inputs[parseInt(inputs[i+2])];
            let arg3 = parseInt(inputs[i+3]);

            if (parseInt(arg1) < parseInt(arg2)){
                inputs[arg3] = 1;
            }
            else {
                inputs[arg3] = 0;
            }
            
            i = i + 4;
        }
        else if (opcode == 8){
            let arg1 = instruction[instruction.length-3] === 1 ? inputs[i+1] : inputs[parseInt(inputs[i+1])];
            let arg2 = instruction[instruction.length-4] === 1 ? inputs[i+2] : inputs[parseInt(inputs[i+2])];
            let arg3 = parseInt(inputs[i+3]);

            if (parseInt(arg1) === parseInt(arg2)){
                inputs[arg3] = 1;
            }
            else {
                inputs[arg3] = 0;
            }
            i = i + 4;
        }
        else {
            console.log("Unknown opcode: ", opcode, " Instruction: ", instruction);
            break;
        }
    }
}

let inputs = fs.readFileSync('input.txt').toString().split(',');

executeInstructions(inputs);

