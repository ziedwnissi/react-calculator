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

This is the main UI stateful component for our application, it renders the `Display` and `Keypad` components and houses all application functions, as well as application state.

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

The initial prroject repository contains all the files we will be using excluding *setupTests.js* as well as the *tests* directory and its contents. From the command line run the following:

```sh
$ git clone git_url
$ cd react-calculator
$ yarn start
```

A new browser tab should open to *localhost:3000* with the only contents of the DOM being `Hello World!`.

> The project repo was initialized using the extremely useful `create-react-app` and then modified for this project. For more information on `create-react-app` check out the [project repo](https://github.com/facebook/create-react-app).

### Create Tests Directory and setupTests.js

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

> `create-react-app` comes configured to run the *setupTests.js* file before each test. If you have an existing React app you want to configure for use with `jest` you can use `setupTestFrameworkScriptFile` from the `jest` docs. More information [here](https://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string).


## Write Initial Tests and Create Components

We will begin by adding the initial code to *Calculator.jsx*, then writing our first test.

### Write Component and First Test

We'll start with the Calculator component, navigate to *Calculator.jsx* and add the following code:

```jsx
import React from 'react';

const Calculator = () => {
  return (
    <div className="calculator-container" />
  );
}

export default Calculator;
```

From the command line create the *tests* directory and *Calculator.spec.js* file:

`$ mkdir src/test && touch src/test/Calculator.spec.js`

Add the first test in *Calculator.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Calculator from '../components/Calculator/Calculator';

describe('Calculator', () => {
  it('should render the Display and Keypad Components', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.containsAllMatchingElements([
      <Display />,
      <Keypad />
    ])).to.equal(true);
  });
});
```

Run the test:

`$ yarn test`

Failurez:

[calculator_render_fail image]

### Create Display and Keypad Components

In *Display.jsx*:

```jsx
import React from 'react';

const Display = () => {
  return (
    <div className="display-container" />
  );
}

export default Display;
```

In *Keypad.jsx*:

```jsx
import React from 'react';

const Keypad = () => {
  return (
    <div className="keypad-container" />
  );
}

export default Keypad;
```

Refactor *Calculator.jsx*:

```jsx
import React from 'react';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad'

const Calculator = () => {
  return (
    <div className="calculator-container">
      <Display />
      <Keypad />
    </div>
  );
}

export default Calculator;
```

Refactor *Calculator.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Calculator from '../components/Calculator/Calculator';
import Display from '../components/Display/Display';
import Keypad from '../components/Keypad/Keypad';

describe('Calculator', () => {
  it('should render the Display and Keypad Components', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.containsAllMatchingElements([
      <Display />,
      <Keypad />
    ])).toEqual(true);
  });
});
```

Cool all should work.

### Next Test

Keypad should contain Key.

`$ touch src/tests/Keypad.spec.js`

*Keypad.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Keypad from '../components/Keypad/Keypad';

it('should render', () => {
  const wrapper = shallow(<Keypad />);
  expect(wrapper.containsAllMatchingElements([
      <Key />
    ])).toEqual(true);
});
```

#############################################################################################################################


Create the other test files and tests:

`$ touch src/tests/Display.spec.js src/tests/Keypad.spec.js touch src/tests/Key.spec.js`

*Display.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Display from '../components/Display/Display';

it('should render', () => {
  const wrapper = shallow(<Display />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
```



*Key.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Key from '../components/Key/Key';

it('should render', () => {
  const wrapper = shallow(<Key />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
```
Run the tests:

`$ yarn test`

All tests should fail with `ReferenceError: <COMPONENT_NAME> is not defined`. Next we wil define our components.

### Green

Now that we have our failing render tests for the application components, we will need to write the initial components to pass the tests.



Then run the tests from the command line:

`$ yarn test`

You should now see `3 failed, 1 passing`. Let's go ahead and write the rest of the components.


In *Key.jsx*:

```jsx
import React from 'react';

const Key = () => {
  return (
    <div className="key-container" />
  );
}

export default Key;
```

Run tests:
`$ yarn test`

All tests should be green!

### Refactor

Now that our tests pass it's time to write some more (refactor!). Let's focus on what the components will have as their contents next.



displayValue = Infinty => '0'
displayValue = NaN => '0'
length of displayValue cannot be greater than 9 chars
Error [operator] number = '0' 




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