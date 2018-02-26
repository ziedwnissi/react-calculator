In this post we will cover approaching a React app with Test Driven Development

Upon completion of this post you will be able to:
- Use TDD to write a React Application 
- Test a React Application with Enzyme and Jest
- Write and use CSS variables
- Set React propTypes

## Project Overview

[images]

## Project Setup

add enzyme
`$ yarn add -D enzyme react-test-renderer enzyme-adapter-react-16`

> `-D` flag tells yarn to save packages to `devDependencies` in *package.json*.
## Write First Tests

TESTS:
render tests

displayValue = Infinty;
displayValue = NaN
displayValue over a x amount of chars

- before anything!
  - change array values for numbers all to strings

1. display functions
  - updates on key click
    - in Calculator.jsx
      - refactor to Class based component
      - add displayValue to this.state
      - add updateDisplay function to constructor and pass to Keypad.jsx
    
    - in Keypad.jsx
      - pass keyAction={updateDisplay} to numbered instances of Key.jsx

    - in Key.jsx
      - onClick={(event) => keyAction(event, keyValue)} to div wrapper

    - in Calculator.jsx
      - in updateDisplay change: 
          displayValue += value 
        to: 
          displayValue === '0' ? displayValue = value : displayValue += value;
        to account for leading '0'

        - create check for "ce" and handle it
        
  - no more than one decimal
  - if display leading with 0 and display != 0, trim 0

1. key functions
  - number update function
  - action key functions
  - submit key function