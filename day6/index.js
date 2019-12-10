const fs = require('fs');


class Node{
    constructor(parent){
        this.parent = parent;
        this.children = [];
    }

    addChild(child){
        this.children.push(child);
    }
}

function createTree(orbits){
    let nodesInTree = new Set();

    orbits.array.forEach(element => {
        
    });
}

let orbits = fs.readFileSync('input.txt').toString().split('\n');

let tree = createTree(orbits);