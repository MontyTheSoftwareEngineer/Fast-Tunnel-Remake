const gridSize = 50;
const lineChangeAmount = 1;
const gapDistance = 12;
let cellSize;

let gameMap = []

function setup() {

  const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
  cellSize = Math.floor(smallerDimension / gridSize);

  createCanvas(gridSize * cellSize, gridSize * cellSize);

  let lineArray = 8;
  gameMap.push( lineArray );
}

function drawLine( start, end ) {
  for ( let x = start[0]; x < end[0]; x++ ) {
  const xPos = x * cellSize;
  const yPos = start[1] * cellSize;

  fill( 0,0,0,255 );
  rect( xPos, yPos, cellSize, cellSize);
  }
}

function addMapLine() {
  const lastLineEnd = gameMap[ gameMap.length - 1];
  const newLineAdj = ( Math.random() < 0.5 ? lineChangeAmount : -lineChangeAmount );
  
  let newStartPos = lastLineEnd + newLineAdj;

  if ( newStartPos <= 0 )
    newStartPos = 0;

  if ( newStartPos >= gridSize - gapDistance )
    newStartPos = gridSize - gapDistance

  gameMap.push(newStartPos)
}


function draw() {
  background(220);

  // Draw the grid
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const xPos = x * cellSize;
      const yPos = y * cellSize;
      fill( 255,255,255,255 );
      rect( xPos, yPos, cellSize, cellSize )
      let gridNum = NumFrom2D( x, y)

      fill( 0,0,0,255 );
      textSize(12);
      textAlign(CENTER, CENTER);
      text(gridNum, xPos + cellSize / 2, yPos + cellSize / 2);
    }
  }

  for ( let y = 0; y < gameMap.length + 1; y++ ){
    let firstSegStart = [ 0, gridSize - y ];
    let firstSegEnd = [ gameMap[y], gridSize - y ];
    drawLine( firstSegStart, firstSegEnd );
    let secondSegStart = [ gameMap[y] + gapDistance, gridSize - y ];
    let secondSegEnd = [ gridSize, gridSize - y ];
    drawLine( secondSegStart, secondSegEnd );

    if ( y === 1 ) {
      let playerPosX = (gameMap[y] + Math.floor(gapDistance / 2)) * cellSize
      fill( 255, 0, 0, 255 )
      rect( playerPosX, ( gridSize - y ) * cellSize, cellSize, cellSize);
    }
  }
  addMapLine();
  if ( gameMap.length > gridSize + 1 ) {
    gameMap.shift()
  }
}
