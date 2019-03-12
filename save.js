//work in progress...

const map = [
  [8, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let rowCount = map.length;
let colCount = map[0].length;
let stopPath = 0;

const startPoint = [0, 0]; //Remove hardcoding here. Make more dynamic. Read the map in initialize/loadMap.
const endPoint = [4, 7];
const compassDir = ["north", "east", "south", "west"];
let compass;
let lastDirection;
let current = [2, 7];
let checking = [];
let queue = [];

//Need to know the last direction.

//row, column, direction
let checkPoint = (r, c, d) => {
  let pointValue;
  let pointType;

  switch (d) {
    case "north":
      if (r !== 0) {
        pointValue = map[r - 1][c];
        checking = [r - 1, c];
      }
      break;
    case "east":
      if (c !== map.length - 1) {
        pointValue = map[r][c + 1];
        checking = [r, c + 1];
      }
      break;
    case "south":
      if (r !== map.length - 1) {
        pointValue = map[r + 1][c];
        checking = [r + 1, c];
      }
      break;
    case "west":
      if (c !== 0) pointValue = map[r][c - 1];
      checking = [r, c - 1];
      break;
    default:
      break;
  }

  if (pointValue === 0) pointType = "blocked-point";
  if (pointValue === 1) {
    pointType = "trail-continues";
  }
  if (pointValue === 2) {
    pointType = "location-found";
  }
  // if(pointValue === undefined)
  //   pointType = 'out-of-map'
  return pointType;
};

let checkAllPoints = () => {
  let checkResponse = {
    north: checkPoint(current[0], current[1], compassDir[0]),
    east: checkPoint(current[0], current[1], compassDir[1]),
    south: checkPoint(current[0], current[1], compassDir[2]),
    west: checkPoint(current[0], current[1], compassDir[3])
  };
  console.log("checkResponse ====>", checkResponse);

  return checkResponse;
};

let startPathfinding = () => {
  let checkResponse = checkAllPoints();
  console.log("startPathfinding ===> checkResponse ===>", checkResponse);
  // let possibleDirections = checkResponse.map((response, index) => response ? compassDir[index] : null).filter(directions => {console.log('asdfasdfs', directions); return directions === 'trail-continues'})
  // console.log('possibleDirections startPathfinding ===>', possibleDirections)
  // possibleDirections.forEach((direction, i) => {
  //   console.log('possibleDirections.forEach =====>', direction, i)
  //   possibleDirections[i] = compassDir[direction]
  //   })

  let possibleDirections = [[], []];
  // compassDir.forEach(direction => checkResponse[direction] ? possibleDirections.push(direction)
  for (let i = 0; i < compassDir.length; i++) {
    if (checkResponse[compassDir[i]] === "location-found")
      alert("You have found it!");
    if (checkResponse[compassDir[i]]) {
      possibleDirections[0].push(checkResponse[compassDir[i]]);
      possibleDirections[1].push(compassDir[i]);
    }
  }

  console.log("possibleDirections ===>", possibleDirections);
  // if(checkResponse.filter(item => item === 'trail-continues').length === 1){
  //     moveUnit(current, possibleDirections[0]);
  //     console.log('Only one option found...\nInitiate moveUnit')
  //   }else{
  // moveUnit();
  moveUnit(current, possibleDirections[1][0]);
  // }

  // continuePathfinding()
  console.log("Current Point ===>", current);
  console.log("Start Pathfinding Check Response ====>", checkResponse);
};

let continuePathfinding = () => {
  console.log("Stop Path:", stopPath);
  // stopPath += 1;
  let checkResponse = checkAllPoints();
  // if(checkResponse.includes('location-found')){
  //   alert('You have found the location!')
  // }else{
  possibleDirections = [];
  locationFound = false;
  for (let key in checkResponse) {
    if (checkResponse[key] === "location-found" && !locationFound) {
      alert("You found it!");
      locationFound = true;
    }
    if (checkResponse[key] === "trail-continues" && !locationFound)
      possibleDirections.push(key);
  }

  console.log("possibleDirections", possibleDirections);

  //   let possibleDirections = checkResponse.map((response, index) => response ? index : null).filter(directions => directions === 'trail-continues')
  // console.log('possibleDirections startPathfinding ===>', possibleDirections)
  // possibleDirections.forEach((direction, i) => {
  //   console.log('possibleDirections.forEach =====>', direction, i)
  //   possibleDirections[i] = compassDir[direction]
  //   })
  // console.log('possibleDirections ===>', possibleDirections)
  // console.log('last direction', lastDirection)
  if (possibleDirections.includes(lastDirection))
    possibleDirections = possibleDirections.filter(
      direction => direction !== lastDirection
    );
  console.log("possibleDirections after filter", possibleDirections);
  // console.log('filtered checkResponse', checkResponse.filter(item => item === 'trail-continues'))
  // if(checkResponse.filter(item => item === 'trail-continues').length === 1){
  //     moveUnit(current, possibleDirections[0]);
  //     console.log('Only one option found...\nInitiate moveUnit')
  // }else{
  // moveUnit();
  if (!locationFound) moveUnit(current, possibleDirections[0]);
  // }
  console.log("Current Point ===>", current);
  console.log("Start Pathfinding Check Response ====>", checkResponse);
  console.log("stopPath after", stopPath);
};
// }

//startLoc is an array
let moveUnit = (currentPoint, direction) => {
  console.log(`Moving unit from ${currentPoint} to direction: ${direction}`);
  switch (direction) {
    case "north":
      lastDirection = compassDir[2];
      currentPoint[0] -= 1;
      break;
    case "east":
      lastDirection = compassDir[3];
      currentPoint[1] += 1;
      break;
    case "south":
      lastDirection = compassDir[0];
      currentPoint[0] += 1;
      break;
    case "west":
      lastDirection = compassDir[1];
      currentPoint[1] -= 1;
      break;
    default:
      break;
  }
  console.log(`Arrived at current point: ${currentPoint}`);
  // checkAllPoints();
  console.log("-------------------------------");
  if (stopPath <= 10) {
    continuePathfinding();
  }
};

let logAllPoints = () => {
  console.log(
    "Running checkPoint - North ===>",
    checkPoint(current[0], current[1], compassDir[0])
  );
  console.log(
    "Running checkPoint - East ===>",
    checkPoint(current[0], current[1], compassDir[1])
  );
  console.log(
    "Running checkPoint - South ===>",
    checkPoint(current[0], current[1], compassDir[2])
  );
  console.log(
    "Running checkPoint - West ===>",
    checkPoint(current[0], current[1], compassDir[3])
  );
};

let logStats = () => {
  console.log(
    `Total rows: ${rowCount}\nTotal columns: ${colCount}\nTotal nodes: ${rowCount *
      colCount}`
  );
  console.log("Start Point ===>", startPoint);
  console.log("End Point ===>", endPoint);
  console.log("Queue", queue);
};

///////////////

logStats();
startPathfinding();

//Simulating queue data structure with array.

//////////////////////////////////////

// let theLog = []
// let theFinish = []

// for(let r = 0; r < rowCount; r++){
//   for(let c = 0; c < colCount; c++){
//     if(map[r][c] === 1){
//       map[r][c] = 'X'
//       theLog.push([r,c])
//     }
//     if(map[r][c] === 2){
//       theFinish.push([r,c])
//     }
//   }
// }
// console.log(map)
// console.log(theLog)
// console.log(theFinish)
