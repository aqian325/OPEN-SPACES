let table;
let hoveredCircleIndex = -1;
let circles = []; // Declare circles as an array
let showTown = false;
// let GillSans;
let Gluten;

function preload() {
  table = loadTable("data/open_spaces_grouped.csv", "header");
  console.log(table);
  Gluten = loadFont("fonts/Gluten-Black.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight*4);
  background(0, 0, 0);
  frameRate(30);

}

function draw() {
  background(0);
  noStroke();
  let hspacing = width / 15;
  let vspacing = height / 100;
  let x = width / 3;
  let y = windowHeight;  // Adjusted starting y-coordinate for circles

  textFont('GillSans');

  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let town = row.getString("TOWN_ID");
    let acres = row.getNum("GIS_ACRES");
    let name = row.getString("Town");
    let circleRadius = sqrt(acres);

    fill(255);
    const green = color(124, 252, 0);
    const gray = color(0, 0, 0);
    let m = map(acres, 0, 10000, 0, 1);
    let cc = lerpColor(gray, green, m);

    let d = dist(mouseX, mouseY, x, y);

    if (d < circleRadius / 2) {
      hoveredCircleIndex = i;

      if (hoveredCircleIndex !== -1) {
        let name1 = table.getRow(hoveredCircleIndex).getString("Town");
        let acreage = parseFloat(table.getRow(hoveredCircleIndex).getString("GIS_ACRES"));
        let households = parseInt(table.getRow(hoveredCircleIndex).getString("Households"));
        let income = parseFloat(table.getRow(hoveredCircleIndex).getString("Median income"));        
        let formattedNumber = income.toLocaleString();
        fill('#B96D40');
        textStyle(BOLD);
        text(name1, width / 8, y);  // Set y-coordinate based on the circle's y

        // Adjusted the x-coordinate to place the text to the right of the circle
        textSize(24);
        textStyle(NORMAL);
        text(round(acreage, 2) + " acres of green space", width / 7.5, y + 50);
        text(households + " households", width / 7.5, y + 100);
        text("median income per household $" + formattedNumber, width / 7.5, y + 150);
      }
    } else {
      fill(cc);
    }

    // Draw the circle
    circle(x, y, circleRadius);

    x += hspacing;
    if (x > width) {
      x = width / 3;
      y += vspacing;
    }
  }
}


function mouseClicked() {
  if (hoveredCircleIndex !== -1) {
    let name1 = table.getRow(hoveredCircleIndex).getString("Town");
    console.log(name1);
  }
}
