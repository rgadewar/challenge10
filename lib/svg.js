const fs = require('fs');

class SVG {
  constructor() {
    this.shapes = [];
    this.textElement = '';
  }

  addShape(shape) {
    this.shapes.push(shape);
  }

  generateSVG() {
    const shapesString = this.shapes.map(shape => shape.render()).join('\n');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">\n${shapesString}\n${this.textElement}\n</svg>`;
    return svgContent;
  }

  saveLogo() {
    const svgContent = this.generateSVG();
    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
  }

  setText(message, color) {
    let truncatedMessage = message; // Store the original message
    if (message.length > 3) {
      truncatedMessage = message.slice(0, 3); // Truncate the text to 3 characters
      const errorMessage = 'Must not be more than 3 characters.';
      this.textElement = `<text x="150" y="120" font-size="40" text-anchor="middle" fill="red">${errorMessage}</text>`;
    } else {
      const textWidth = 300 / 2; // Half of the SVG width (300/2)
      const textHeight = 200 / 2; // Half of the SVG height (200/2)
      const fontSize = 40;
  
      const x = textWidth;
      const y = textHeight + (fontSize / 4); // Adjust the y coordinate for vertical alignment
  
      this.textElement = `<text x="${x}" y="${y}" font-size="${fontSize}" text-anchor="middle" fill="${color}">${truncatedMessage}</text>`;
    }
  }
  
}

module.exports = SVG;
