In this post we will cover approaching a React app with Test-Driven Development

Upon completion of this post you will be able to:
- Use TDD to write a React Application 
- Test a React Application with Enzyme and Jest
- Write and use CSS variables
- Create a reusable Component that renders and functions differently based on props
- Use React propTypes to type check component props

## Project Overview

We will be building a basic calculator application consisting of four UI components using Test-Driven Development. Below are screenshots of the completed components with short descriptions:

### Calculator Component

[Calculator image]

This is the main UI stateful component for our application, it renders our `Display` and `Keypad` components and houses all application functions, as well as application state.

### Display Component
stateless
[Display image]

### Keypad Component
stateless
[Keypad image]

### Key Component
stateless
[Key image]

## Project Setup

`$ git clone git_url`
`$ cd react-calculator`
`$ yarn start`

> The project repo was initialized using the extremely useful `create-react-app` and then modified for this project. For more information please check out 

While `create-react-app` comes with `jest` built in, we will need to add `enzyme` and `react-test-renderer` manually, `enzyme` requires `react-test-renderer` for React apps of version 15.5 or greater.

`$ yarn add -D enzyme react-test-renderer enzyme-adapter-react-16`

> Using the `-D` or `--dev` flag will have yarn save packages to `devDependencies` in *package.json*.

Create *setupTests.js*:

`$ touch src/setupTests.js`

Add the following code to *setupTests.js*:

```js
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

> `create-react-app` comes configured to run the *setupTests.js* file before each test when `$ yarn test` is ran. If you have an existing app you want to configure for use with `jest` you can use `setupTestFrameworkScriptFile` from the `jest` docs. More information [here](https://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string).


## Begin Writing Tests

We will begin by writing some basic rendering tests that will fail when the tests are ran, and then will use the Red/Green/Refactor cycle to add the needed code for our tests to pass.

Create *tests* directory and *Calculator.spec.js*:

`$ mkdir src/test && touch src/test/Calculator.spec.js`

In *Calculator.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Calculator from '../components/Calculator/Calculator';

it('should render', () => {
  const wrapper = shallow(<Calculator />);
  expect(wrapper.find('div').length).toEqual(1);
});
```

Run the test:

`$ yarn test`

[calculator fail image]

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