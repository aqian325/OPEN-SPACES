let table;
let hoveredCircleIndex = -1; 

function preload() {
  table = loadTable("data/emissions.csv", "header");
  //console.log(table);
  /* multi
   line
   comments */
}

function setup() {
  createCanvas(900, 1800);
  background(255, 0, 0);
  frameRate(10);
}


function draw() {
  background(0);
  noStroke();
  
  let hspacing = 300;
  let vspacing = 75;
  
  //console.log(table.getRows().length);
  let x = 20;
  let y = 50;

  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    //console.log(row);
    let name = row.getString("Building Name");
    //console.log(name);
    let emissions = row.getNum("Emissions");
    
    let circleRadius = sqrt(emissions) * 20;
    
    //console.loxg(emissions);

    fill(255);
    const yellow = color(218, 165, 32);
    const blue = color(72, 61, 139);
    let m = map(emissions, 0, 30, 0, 1); 
    let cc = lerpColor(blue, yellow, m);
    //fill(cc);
    //circle(x, y, sqrt(emissions)*10);
    
    // Check if the mouse is over the circle
    let d = dist(mouseX, mouseY, x, y);
    if (d < circleRadius / 2) {
      // Mouse is over the circle, highlight it
      fill(255, 0, 0); // Change to a different color when hovered
      hoveredCircleIndex = i; // Store the index of the hovered circle
    } else {
      fill(cc);
    }
    
    // Draw the circle
    circle(x, y, circleRadius);

    // rect(x + 10, y + 10, 20, 20);
    //this is moving the circles down the line if they reach the right edge
    x += hspacing;
    if (x > width) {
      x = 20;
      y += vspacing;
    }
  }
  
  x = 20;
  y = 50;

  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let name = row.getString("Building Name");
    let emissions = row.getNum("Emissions");
    fill(255);
    text(name, x, y);
    //circle(x, y, 40);
    x += hspacing;
    if (x > width) {
      x = 20;
      y += vspacing;
    }
  }


  fill(255);
  //text(frameRate(), 20, height - 20);
  text(frameCount, 20, height - 20);
}

function mouseClicked() {
  let name = table.getRow(hoveredCircleIndex).getString("Building Name");
  console.log(name);
  
  // You can handle mouse click events here if needed
  
}
