let table;
let hoveredCircleIndex = -1;
let clickedCircleIndex = -1; // Track the clicked circle index
let circles = []; // Declare circles as an array
let showTown = false;
// let GillSans;
let Gluten;
let Glutenthin;


function preload() {
  table = loadTable("data/open_spaces_grouped.csv", "header");
  console.log(table);
  Gluten = loadFont("fonts/Gluten-Black.ttf");
  Glutenthin = loadFont("fonts/Gluten-Thin.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight*7);
  background(0, 0, 0);
  // frameRate(30);

}

function draw() {
  background(0);
  noStroke();
  let hspacing = 200;
  let vspacing = 200;
  let x = windowWidth / 3;
  let y = windowHeight;  // Adjusted starting y-coordinate for circles

  textFont('GillSans');
  text("Thanks for exploring open spaces in Massachusetts with me.",width-1200,height-150);

  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let town = row.getString("TOWN_ID");
    let acres = row.getNum("GIS_ACRES");
    let name = row.getString("Town");
    let circleRadius = sqrt(acres);

    fill(255);
    const green = color(124, 252, 0);
    const gray = color(32, 32, 32);
    let m = map(acres, 0, 10000, 0, 1);
    let cc = lerpColor(gray, green, m);

    let d = dist(mouseX, mouseY, x, y);

    if (d < circleRadius / 2) {
      hoveredCircleIndex = i;
      showTown = true; // Set showTown to true when a circle is hovered
    }

    if (showTown && hoveredCircleIndex === i) {
        let name1 = table.getRow(hoveredCircleIndex).getString("Town");
        let acreage = parseFloat(table.getRow(hoveredCircleIndex).getString("GIS_ACRES"));
        let households = parseInt(table.getRow(hoveredCircleIndex).getString("Households"));
        let income = parseFloat(table.getRow(hoveredCircleIndex).getString("Median income"));        
        let formattedNumber = income.toLocaleString();
        fill('#B96D40');
        textFont('GillSans');
        textStyle(BOLD);
        textSize(32);
        text(name1, width / 8, y);  // Set y-coordinate based on the circle's y

        // Adjusted the x-coordinate to place the text to the right of the circle
        textSize(24);
        textStyle(NORMAL);
        text(round(acreage, 2) + " acres of green space", width / 7.5, y + 50);
        text(households + " households", width / 7.5, y + 100);
        text("median income per household $" + formattedNumber, width / 7.5, y + 150);
        fill(255);
        text("click on another circle to compare!", width/7.5, y+300);
        fill('#B96D40');
        
        if (mouseIsPressed) {
          clickedCircleIndex = hoveredCircleIndex;
        }

      } else {
      fill(cc);
      
    }

    // Draw the circle
    circle(x, y, circleRadius);
    if (i % 40 === 7) {
      fill(255);
      textSize(28);
      textFont(Glutenthin);
      text(name.charAt(0), x+50, y);
    }


    x += hspacing;
    if (x > width-width/8) {
      x = width / 3;
      y += vspacing;
    }
  }


  // If no circle is hovered or clicked, hide the information
  if (hoveredCircleIndex === -1 && clickedCircleIndex === -1) {
    showTown = false;
  }

}
function mouseClicked() {
  // Check if the mouse is over any circle
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let acres = row.getNum("GIS_ACRES");
    let circleRadius = sqrt(acres);
    let d = dist(mouseX, mouseY, x, y);

    if (d < circleRadius / 2) {
      clickedCircleIndex = i;
      break; // Exit the loop after finding the clicked circle
    }
  }
}