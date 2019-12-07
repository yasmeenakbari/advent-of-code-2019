const fs = require('fs');

function generatePoints(line1){
    let points = [];
    let x = 0;
    let y = 0;

    for (let seg of line1){
        if (seg[0] === 'R'){
            x = x + parseInt(seg.slice(1));
        } 
        else if (seg[0] === 'L'){
            x = x - parseInt(seg.slice(1));
        }
        else if (seg[0] === 'U'){
            y = y + parseInt(seg.slice(1));
        }
        else if (seg[0] === 'D'){
            y = y - parseInt(seg.slice(1));
        }
        console.log(`${x},${y}`);
        points.push(`${x},${y}`);
    }

    return points;
}


let inputs = fs.readFileSync('input.txt').toString().split('\n');
let line1 = inputs[0].split(',');
let line2 = inputs[1].split(',');

let points1 = generatePoints(line1);
let points2 = generatePoints(line2);

