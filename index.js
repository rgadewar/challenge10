const inquirer = require('inquirer');
const fs = require('fs');
const SVG = require('./lib/svg.js');
const Shape = require('./lib/shapes.js');

const questions = [
  {
    name: "text",
    type: "input",
    message: "Enter text for the logo. (Must not be more than 3 characters.)",
  },
  {
    name: "textColor",
    type: "input",
    message: "Enter a text color",
  },
  {
    name: "shapeType",
    type: "list",
    message: "Select a shape for the logo",
    choices: ["circle", "square", "triangle"],
  },
  {
    name: "shapeColor",
    type: "input",
    message: "Enter a shape color",
  },
];

inquirer
  .prompt(questions)
  .then(({ text, textColor, shapeType, shapeColor }) => {
    const svg = new SVG();
    const shapeObj = createShapeObject(shapeType, shapeColor);
    svg.addShape(shapeObj);
    svg.setText(text, textColor);
    svg.saveLogo();
  });

function createShapeObject(shape, color) {
  if (shape === 'circle') {
    return new Shape.Circle(color);
  } else if (shape === 'triangle') {
    return new Shape.Triangle(color);
  } else if (shape === 'square') {
    return new Shape.Square(color);
  }
}
