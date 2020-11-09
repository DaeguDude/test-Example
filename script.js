let numCols = '';
let numRows = '';

let randomRgbsList = []

// Remove all childs of one node
function removeAllChilds(node) {
  while(node.lastChild) {
    node.removeChild(node.lastChild);
  }
} 

// Prompt User for asking how many squares to be made
// If callback is passed in, execute callback function
function promptUserSqrs(makeGrid) {
  numCols = prompt("How many squares in a row?");
  numRows = prompt("How many squares in a column?");

  // If makeGrid function was passed, execute the function
  if (typeof makeGrid != 'undefined') {
    makeGrid(numCols, numRows);
  }
}

// This will make a grid in the container by given number of cols and rows
function makeGrid(numCols, numRows) {
  // Get container style ready for the given GridItems
  container.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

  // Make random RGB value list that contains RGB values for 
  // the given number of divs
  makeRgbsList(numCols, numRows);
  
  // Make grid items and append it to the container box
  let numGridItems = numRows * numCols
  for (let i = 0; i < numGridItems; i++) {

    // Create an element div, which has custom attribute 'data-num-hovered'
    // 'data-num-hovered' will be checked for number of times the div is
    // hovered
    let newDiv = document.createElement("div");
    newDiv.setAttribute("data-num-hovered", 0);
        
    // When mouse hovers to the div, it changes the color
    newDiv.addEventListener("mouseover", () => {
      // Get the value of how number of times it was hovered.
      let numCalled = newDiv.getAttribute("data-num-hovered");
      
      // This is the initial RGB, we take it from the list that has Random
      // Rgb value.
      let initialRGB = randomRgbsList[i];

      // First check it was hovered more than 10 times, if not, we increment
      // and make it more darker. 
      // The reason we give 11 is to not consider first hover as a hover.

      // If it was never called before, give initialRGB value as a background    
      if (numCalled < 11) {
        if (numCalled === 0) {
          newDiv.style.background = initialRGB; 
          numCalled++;
        } else {
          numCalled++;
          newDiv.setAttribute("data-num-hovered", numCalled);

          let newRGB = makeRGBGivenPercentToBlack(initialRGB, numCalled);
          newDiv.style.background = newRGB;
        }
      }
    });
    // Finally append it to the child
    container.appendChild(newDiv);
  }
}

// This make random RGB values for given number of the boxes in the grid
// This values will be assigned to each div in the grid
function makeRgbsList(numCols, numRows) {
  for (let i = 0; i < numCols * numRows; i++) {
    randomRgbsList.push(giveRandomRGB())
  }
}

// Make the value given percent close to black
function makeRGBGivenPercentToBlack(rgbValue, numCalled) {
  let rgbInArray = rgbStringTearDown(rgbValue);
  
  let red = rgbInArray[0];
  let green = rgbInArray[1];
  let blue = rgbInArray[2];

  let percent = (1 - (numCalled / 10)).toPrecision(2);

  red = (red * percent).toPrecision(4);
  green = (green * percent).toPrecision(4);
  blue = (blue * percent).toPrecision(4);

  return `rgb(${red}, ${green}, ${blue})`;
}

// This will tear down the rgb string, and return rgb as an array-like
// e.g. rgb(10, 20, 50) -> [10, 20, 50]
function rgbStringTearDown(rgbStr) {
  let startIndex = rgbStr.search("\\(") + 1;
  let endIndex = rgbStr.search("\\)");
  let rgb = rgbStr.substring(startIndex, endIndex);
  rgb = rgb.split(",");
  
  return rgb;
}

// This will giv ethe random RGB value
function giveRandomRGB() {
  let redVal = Math.floor(Math.random() * 256);
  let greenVal = Math.floor(Math.random() * 256);
  let blueVal = Math.floor(Math.random() * 256);

  return `rgb(${redVal}, ${greenVal}, ${blueVal})`;
}


// MAIN CODE STARTS HERE!
promptUserSqrs();

let container = document.getElementById("container");

makeGrid(numCols, numRows)

// If the button is clicked
let clearButton = document.getElementById("reset");
clearButton.addEventListener("click", () => {
  removeAllChilds(container);
  setTimeout(promptUserSqrs(makeGrid), 1000);
});