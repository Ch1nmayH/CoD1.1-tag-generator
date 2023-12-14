import React, { useState } from 'react';
import './style.css';
import example from './img/example.JPG';

function App() {
  const MAX_CHARACTERS = 32;
  const [inputText, setInputText] = useState('');

  function handleInputChange(e) {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARACTERS) {
      setInputText(newText);
    }
  }

  function previewColors() {
    const colorMap = {
      '1': 'red',
      '2': 'green',
      '3': 'yellow',
      '4': 'blue',
      '5': 'cyan',
      '6': 'magenta',
      '7': 'white',
      '0': 'black',
    };

    let output = '';
    let currentIndex = 0;
    while (currentIndex < inputText.length) {
      const currentChar = inputText[currentIndex];
      if (currentChar === '^') {
        // Check if the next character is a color code
        if (
          currentIndex + 1 < inputText.length &&
          /[0-7]/.test(inputText[currentIndex + 1])
        ) {
          const colorCode = inputText[currentIndex + 1];
          const colorName = colorMap[colorCode];
          output += `<span class="${colorName}">`;
          currentIndex += 2;
        } else {
          // Escaped caret
          output += '^';
          currentIndex += 1;
        }
      } else {
        output += currentChar;
        currentIndex += 1;
      }
    }

    return output;
  }

  return (
    <div className="container">
      <h1>Call of Duty 1.1 tag Generator</h1>
      <div id="description">
        <h2>How to use</h2>
        <p>
          Enter the text you want to colorize using Call of Duty 1.1 tag
          Generator in the input field below. Use the caret (^) symbol followed
          by a number to change the text color. For example, "^1Red ^2Green
          ^3Yellow ^4Blue ^5Cyan ^6Magenta ^7White ^0Black". You can also use the
          caret symbol (^) by itself to display a caret.
        </p>
      </div>
      <img
        src={example}
        alt=""
        style={{ display: 'block', margin: '20px auto', width: '30%' }}
      />
      <form>
        <label htmlFor="color-input">Enter the tag to preview: </label>
        <input
          type="text"
          id="color-input"
          name="color-input"
          value={inputText}
          onChange={handleInputChange}
        />
        <div
          id="color-preview"
          dangerouslySetInnerHTML={{ __html: previewColors() }}
        ></div>
      </form>
    </div>
  );
}

export default App;
