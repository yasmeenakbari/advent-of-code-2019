const fs = require('fs');


function calculateOutput(inputs){
    for (let i = 0; i < inputs.length; i = i + 4){
        let opcode = parseInt(inputs[i]);
    
        if (opcode == 99){
            break;
        }
    
        let pos1 = parseInt(inputs[i+1]);
        let pos2 = parseInt(inputs[i+2]);
        let pos3 = parseInt(inputs[i+3]);
        if (opcode == 1){
            inputs[pos3] = parseInt(inputs[pos1]) + parseInt(inputs[pos2]);
        }
        else if (opcode == 2){
            inputs[pos3] = parseInt(inputs[pos1]) * parseInt(inputs[pos2]);
        }
        // else {
        //     console.log("Unknown opcode: ", opcode);
        // }
    }

    return inputs[0];
}

let inputs = fs.readFileSync('input.txt').toString().split(',');

for (let i = 0; i <= 99; i++){
    for (let j = 0; j <= 99; j++){
        let resetInputs = [...inputs];
        resetInputs[1] = i;
        resetInputs[2] = j;
        let output = calculateOutput(resetInputs);
        if (output == 19690720){
            console.log("noun=",i,"\nverb=",j);
        }
    }
}

