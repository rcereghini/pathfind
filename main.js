//work in progress...

const map = [
  [8, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 2, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
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
let stepsTaken = 0;
let current = startPoint;
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
  if (pointValue === 1) pointType = "trail-continues";
  if (pointValue === 2) pointType = "location-found";
  // if(pointValue === undefined) pointType = 'out-of-map'

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
current = startPoint;

let pathfind = () => {
  // console.log('Stop Path:', stopPath)
  stopPath += 1;
  let checkResponse = checkAllPoints();
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
  if (possibleDirections.includes(lastDirection))
    possibleDirections = possibleDirections.filter(
      direction => direction !== lastDirection
    );
  console.log("possibleDirections after filter", possibleDirections);
  if (!locationFound && possibleDirections.length === 1)
    moveUnit(current, possibleDirections[0]);
  if (!locationFound && possibleDirections.length > 1) {
    console.log("MULTIPLE DIRECTIONS - ENTER THE FORRRKKK");

    moveUnit(
      current,
      possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
    );
  }
  console.log("Current Point ===>", current);
  console.log("Start Pathfinding Check Response ====>", checkResponse);
  console.log("stopPath after", stopPath);
};

//startLoc is an array
let moveUnit = (currentPoint, direction) => {
  console.log(`Moving unit from ${currentPoint} to direction: ${direction}`);
  stepsTaken++;
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
  console.log("Steps Taken:", stepsTaken);
  console.log("-------------------------------");
  if (stopPath <= 50) {
    pathfind();
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

//random pathfinder... takes possibleDirections and randomizes the index.

///////////////

logStats();
pathfind();

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
