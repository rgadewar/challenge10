const fs = require('fs');
const SVG = require('./svg');

// A testing suite for SVG
describe('SVG', () => {
  // A test is created to check that addShape method adds a shape to the shapes array.
  describe('addShape', () => {
    test('addShape method should add a shape to the shapes array', () => {
      const svg = new SVG(); // Create an instance of the SVG class
      const shape = { render: jest.fn() };
      svg.addShape(shape); // Call addShape on the SVG instance

      expect(svg.shapes).toContain(shape); // Access shapes property on the SVG instance
    });
  });
});


describe('SVG', () => {
  // A test is created to check that saveLogo method should write the SVG content to the file
  describe('saveLogo', () => {
    test('saveLogo method should write the SVG content to the file', () => {
      const svg = new SVG(); // Create an instance of the SVG class

      const writeFileSpy = jest.spyOn(fs, 'writeFileSync');
      const consoleLogSpy = jest.spyOn(console, 'log');

      svg.generateSVG();
      svg.saveLogo();

      expect(writeFileSpy).toHaveBeenCalledWith('logo.svg', expect.any(String));
      expect(consoleLogSpy).toHaveBeenCalledWith('Generated logo.svg');

      // Clean up the spies
      writeFileSpy.mockRestore();
      consoleLogSpy.mockRestore();
    });
  });
});

// A testing suite for SVG
describe('SVG', () => {
  // A test is created to check the behavior of setText method with a long message
  describe('setText', () => {
    test('setText method should truncate the long informative message to 3 characters', () => {
      const svg = new SVG();
      const longMessage = 'Enter text for the logo. (Must not be more than 3 characters.)';
      const expectedErrorMessage = 'Must not be more than 3 characters.';

      svg.setText(longMessage, 'blue');

      expect(svg.textElement).toContain(expectedErrorMessage);
    });

    test('setText method should not show an error message for a short message', () => {
      const svg = new SVG();
      const shortMessage = 'Hi';

      svg.setText(shortMessage, 'green');

      expect(svg.textElement).not.toContain('Must not be more than 3 characters.');
    });
  });
});

describe('SVG', () => {
  describe('generateSVG', () => {
    test('should generate SVG content with shapes and text elements', () => {
      // Create an instance of SVG
      const svg = new SVG();

      // Add shapes to the SVG
      const shape1 = { render: jest.fn(() => '<circle cx="50" cy="50" r="40" fill="red" />') };
      const shape2 = { render: jest.fn(() => '<rect x="20" y="20" width="100" height="100" fill="blue" />') };
      svg.addShape(shape1);
      svg.addShape(shape2);

      // Set text element
      const textElement = '<text x="150" y="120" font-size="40" text-anchor="middle" fill="green">Hi</text>';
      svg.textElement = textElement;

      // Generate SVG content
      const expectedSVGContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">\n${shape1.render()}\n${shape2.render()}\n${textElement}\n</svg>`;
      const generatedSVGContent = svg.generateSVG();

      // The generated SVG content should match the expected SVG content
      expect(generatedSVGContent).toEqual(expectedSVGContent);
    });
  });
});
