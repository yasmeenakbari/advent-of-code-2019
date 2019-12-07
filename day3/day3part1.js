const fs = require('fs');

function generateFirstLine(line1){
    //Generates coordinates
    let points = [{'x' : 0, 'y' : 0}];
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
        points.push({'x' : x, 'y' : y});
    }

    return points;
}

function checkWithinXCoords(p1, p2, p3){
    if ((p1.x >= p2.x && p1.x <= p3.x) || (p1.x <= p2.x && p1.x >= p3.x)){
        return true;
    }

    return false;
}

function checkWithinYCoords(p1, p2, p3){
    if ((p1.y >= p2.y && p1.y <= p3.y) || (p1.y <= p2.y && p1.y >= p3.y)){
        return true;
    }

    return false;
}

function checkGreaterThanXCoords(p1, p2, p3){
    if (p1.x >= p2.x && p1.x >= p3.x){
        return true;
    }
    return false;
}

function checkGreaterThanYCoords(p1, p2, p3){
    if (p1.y >= p2.y && p1.y >= p3.y){
        return true;
    }
    return false;
}

function checkLessThanXCoords(p1, p2, p3){
    if (p1.x < p2.x && p1.x < p3.x){
        return true;
    }
    return false;
}

function checkLessThanYCoords(p1, p2, p3){
    if (p1.y < p2.y && p1.y < p3.y){
        return true;
    }
    return false;
}

function checkForIntersections(line2Point1, line2Point2, listOfPoints){
    let intersections = []
    
    for (let i = 0; i < (listOfPoints.length - 1); i++){
        line1Point1 = listOfPoints[i];
        line1Point2 = listOfPoints[i+1];

        if (checkWithinXCoords(line2Point1, line1Point1, line1Point2) && checkWithinXCoords(line2Point2, line1Point1, line1Point2)){
            if (checkLessThanYCoords(line2Point1, line1Point1, line1Point2) && checkGreaterThanYCoords(line2Point2, line1Point1, line1Point2)){
                intersections.push({'x': line2Point1.x, 'y': line1Point1.y});
            }
            else if (checkLessThanYCoords(line2Point2, line1Point1, line1Point2) && checkGreaterThanYCoords(line2Point1, line1Point1, line1Point2)){
                intersections.push({'x': line2Point1.x, 'y': line1Point1.y});
            }
        }
        else if (checkWithinYCoords(line2Point1, line1Point1, line1Point2) && checkWithinYCoords(line2Point2, line1Point1, line1Point2)){
            if (checkLessThanXCoords(line2Point1, line1Point1, line1Point2) && checkGreaterThanXCoords(line2Point2, line1Point1, line1Point2)){
                intersections.push({'x': line1Point1.x, 'y': line2Point2.y});
            }
            else if (checkLessThanXCoords(line2Point2, line1Point1, line1Point2) && checkGreaterThanXCoords(line2Point1, line1Point1, line1Point2)){
                intersections.push({'x': line1Point1.x, 'y': line2Point2.y});
            }
        }
    }

    return intersections;
}

function generateSecondLineAndFindIntersections(line2, points1){
    let intersections = [];
    let points2 = [{'x' : 0, 'y' : 0}];
    let x = 0;
    let y = 0;

    for (let seg of line2){
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
        points2.push({'x' : x, 'y' : y});

        intersections = intersections.concat(checkForIntersections(points2[points2.length-2], points2[points2.length-1], points1));
    }

    return intersections;
}

function findClosestIntersection(intersections){
    let closestDist = Number.MAX_SAFE_INTEGER;

    for (let coords of intersections){
        let dist = Math.abs(coords.x) + Math.abs(coords.y);
        if (dist < closestDist){
            closestDist = dist;
        }
    }

    return closestDist;
}

let inputs = fs.readFileSync('input.txt').toString().split('\n');
let line1 = inputs[0].split(',');
let line2 = inputs[1].split(',');

let points1 = generateFirstLine(line1);
let intersections = generateSecondLineAndFindIntersections(line2, points1);

console.log("intersections ", intersections);
console.log(findClosestIntersection(intersections));

