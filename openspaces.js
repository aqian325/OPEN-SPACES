let table;
let hoveredCircleIndex = -1; 

function preload() {
  table = loadTable("data/open_spaces_grouped.csv", "header");
  console.log(table);
  /* multi
   line
   comments */
}

function setup() {
  createCanvas(1800, 2000);
  background(255, 0, 0);
  frameRate(10);
}


function draw() {
  background(0);
  noStroke();
  
  let hspacing = 150;
  let vspacing = 50;
  
//   console.log(table.getRows().length);
  let x = 20;
  let y = 50;
  
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    console.log(row);
    let town = row.getString("TOWN_ID");
    //console.log(town);
    let acres = row.getNum("GIS_ACRES");
    
    let circleRadius = sqrt(acres) ;
    
    //console.loxg(acres);

    fill(255);
    const green = color(155, 197, 61);
    const gray = color(208, 224, 227);
    let m = map(acres, 0, 10000, 0, 1); 
    let cc = lerpColor(gray, green, m);
    //fill(cc);

    // circle(x, y, sqrt(acres)*10);
    
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
    let town = row.getString("TOWN_ID");
    let acres = row.getNum("GIS_ACRES");
    fill(255);
    text(town, x + 40, y);
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
  let town = table.getRow(hoveredCircleIndex).getString("TOWN_ID");
  console.log(town);
  
  // You can handle mouse click events here if needed
  
}
