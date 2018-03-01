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

We'll start by testing the Calculator component. We know that it will wrap our Keypad and Display components... 

From the command line create the *tests* directory and *Calculator.spec.js* file:

`$ touch src/components/Calulator/Calculator.spec.js`

Add the first test in *Calculator.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
```

Run the test:

`$ yarn test`

FAIL.

navigate to *Calculator.jsx* and add the following code:

```jsx
import React from 'react';

const Calculator = () => <div className="calculator-container" />;

export default Calculator;
```

Run the test:

`$ yarn test`

SUCCESS!

> You may have noticed if you didn't exit the test suite it is still running on the command line. As long as it is running it will continue watching your files for changes and will rerun the tests on file changes. You may leave it running as you continue through this tutorial, or can exit and run it at your leisure.

then add the next test:


######## change to display should render, do display stuff (go ahaed and do props stuff in display too), then refactor to display and keypad, do keypad stuff ######

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

Failurez!

### Create Display and Keypad Components

Create Display test file:

`$ touch src/components/Display/Display.spec.js`

In *Display.spec.jsx*:

```js
import React from 'react';
import {mount, shallow} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  it('renders a <div />', () => {
    const wrapper = shallow(<Display />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
```

Fails!

In *Display.jsx*:

```jsx
import React from 'react';

const Display = () => <div className="display-container" />;

export default Display;
```

display.spec.js passes, calculator.spec.js fails

`$ touch src/components/Keypad/Keypad.spec.js`

In *Keypad.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Keypad from './Keypad';

describe('Keypad', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Keypad />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
```

Failzzzz

In *Keypad.jsx*:

```jsx
import React from 'react';

const Keypad = () => <div className="keypad-container" />;

export default Keypad;
```

keypad.spec.js passes, calculator.spec.js fails

Refactor *Calculator.jsx* to include Display, Keypad:

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

*Keypad.spec.js*:

```js
import React from 'react';
...
import Key from '../Key/Key';

describe('Keypad', () => {
  ...

  it('should render the Key component', () => {
  const wrapper = shallow(<Keypad />);
  expect(wrapper.containsAllMatchingElements([
      <Key />
    ])).toEqual(true);
  });
});
```

Failz

Create test file:

`$ touch src/components/Key/Key.spec.js`

In *Key.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Key from './Key';

describe('Key', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Key />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
```

In *key.jsx*:

```jsx
import React from 'react';

const Key = () => <div className="key-container" />;

export default Key;
```

Refactor *Keypad.jsx* to include `Key`:

```jsx
import React from 'react';
import Key from '../Key/Key';

const Keypad = () => {
  return (
    <div className="keypad-container">
      <Key />
    </div>
  );
}

export default Keypad;
```

### Test Display Component

Display has prop `displayValue`:

in *Display.spec.js:

```jsx
import React from 'react';
import {mount} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  it('should set prop displayValue', () => {
    const wrapper = mount(<Display displayValue="testDisplay" />);
    expect(wrapper.prop('displayValue')).toEqual('testDisplay');
    wrapper.setProps({displayValue: 'newDisplay'});
    expect(wrapper.prop('displayValue')).toEqual('newDisplay');
  });
});
```

Test failz...

> diff between shallow and mount...

Refactor *Display.jsx* and add propTypes, defaultProps:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Display = ({displayValue}) => <div className="display-container" />;

Display.propTypes = {displayValue: PropTypes.string.isRequired};

Display.defaultProps = {displayValue: '0'};

export default Display;
```


### Test Key Component

Key receives props [keyType, keyValue]


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