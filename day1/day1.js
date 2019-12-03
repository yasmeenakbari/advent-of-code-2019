const readline = require('readline');
const fs = require('fs');




//find the fuel required for a module, take its mass, divide by three, round down, and subtract 2
function calculateFuelPart1(mass) {
    return Math.floor(mass/3) - 2;
}

function calculateFuelPart2(fuel){
    if (fuel <= 0){
        return 0;
    }
    
    let fuelNeeded = Math.floor(fuel/3) - 2;

    if (fuelNeeded < 0) {
        return 0;
    }
    return fuelNeeded + calculateFuelPart2(fuelNeeded);
}


//Taken from: https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
async function processLineByLine() {
    const fileStream = fs.createReadStream('input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    let total = 0;
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      console.log(`Line from file: ${line}`);

    //   total += calculateFuelPart1(parseInt(line));
      total += calculateFuelPart2(line);
    }

    console.log('Total Fuel:', total);
  }
  

processLineByLine();

