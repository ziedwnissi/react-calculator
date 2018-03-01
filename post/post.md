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

[Display image]
stateless, receives prop displayValue

### Keypad Component

[Keypad image]
stateless, receives props [callOperator, handleKeyPress, numbers, operators, setOperator, updateDisplay]

### Key Component

[Key image]
stateless, receives props [handleKeyPress, keyAction, keyType, keyValue]

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

### Create First Test

We will begin by adding the first failing test for the `Calculator` component, and then write the code for it to pass.

From the command line create the *Calculator.spec.js* file:

`$ touch src/components/Calulator/Calculator.spec.js`

Next add a shallow render test in *Calculator.spec.js*:

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

The test will fail as the `Calculator` component has not been written. Navigate to *Calculator.jsx* and add the following code:

```jsx
import React from 'react';

const Calculator = () => <div className="calculator-container" />;

export default Calculator;
```

Run the test:

`$ yarn test`

The first test should now pass!

> You may have noticed if you didn't exit the test suite it is still running on the command line. As long as it is running it will continue watching your files for changes and will run the tests on file changes. You may leave it running as you continue through this tutorial, or can exit and run it at your leisure.

From the mockups we know that the `Calculator` compoponent will contain the Display and Keypad components. Next step is to write a test that checks for the presence of the `Display` component in `Calculator`. Add the test in *Calculator.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display'

describe('Calculator', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.find('div').length).toEqual(1);
  });
  
  it('should render the Display component', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.containsMatchingElement(<Display />)).toEqual(true);
  });
});
```

This test will fail as the `Display` component does not exist.

### Create Display Test File and Initial Display Component

Before we write the `Display` component, let's add our `Display` test file and setup a shallow render test like we did with the `Calculator` component.

From the command line create *Display.spec.js*:

`$ touch src/components/Display/Display.spec.js`

Write our shallow render test in *Display.spec.jsx*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Display />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
```

As the `Display` component still does not exist, the test will fail.

Add the component in *Display.jsx*:

```jsx
import React from 'react';

const Display = () => <div className="display-container" />;

export default Display;
```

Then add the `Display` component to *Calculator.jsx*:

```jsx
import React from 'react';
import Display from '../Display/Display';

const Calculator = () => {
  return (
    <div className="calculator-container">
      <Display />
    </div>
  );
}

export default Calculator;
```

Both test suites pass!

## Continue Writing `Display` Component Tests and Building Out Component

### Display has default prop `displayValue`

in *Display.spec.js*:

```jsx
import React from 'react';
import {mount, shallow} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  ...

  it('has default prop displayValue', () => {
    const wrapper = mount(<Display />);
    expect(wrapper.props().displayValue).toEqual('default');
  });

  it('has settable prop displayValue', () => {
    const wrapper = mount(<Display />);
    wrapper.setProps({displayValue: 'new value'});
    expect(wrapper.prop('displayValue')).toEqual('new value');
  });
});
```

New Test failz...

> diff between shallow and mount...

Refactor *Display.jsx* and add `[propTypes, defaultProps]`:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Display = ({displayValue}) => <div className="display-container" />;

Display.propTypes = {displayValue: PropTypes.string.isRequired};

Display.defaultProps = {displayValue: 'default'};

export default Display;
```

Passes!

### Renders `displayValue` to the DOM

```js
import React from 'react';
import {mount, shallow} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  ...

  it('renders the value of displayValue to the DOM', () => {
    const wrapper = mount(<Display />);
    expect(wrapper.text()).toEqual('default');
    wrapper.setProps({displayValue: 'new value'});
    expect(wrapper.text()).toEqual('new value');
  });
});
```

Fail...

Refactor *Display.jsx*:

```jsx
...
const Display = ({displayValue}) => {
  return (
    <div className="display-container">
      <p className="display-value">
        {displayValue}
      </p>
    </div>
)};
...
```

Pass!

### Add Snapshot Testing

Snapshots are not part of TDD as they are generated after a component has been written, but let's add them since we now have the completed component in case of any unexpected changes...

*Display.spec.js*:

```jsx
...
describe('Display', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Display />);
    expect(wrapper).toMatchSnapshot();
  });
  
  ...
});
```

## Add `Keypad` Component and Tests

Now that we have the `Display` component built out, we need to add in our `Keypad` component. We'll start by testing for it in our `Calculator` component tests. Refactor the `should render the Display component` test in *Calculator.spec.js*:

```js
import React from 'react';
...
import Keypad from '../Keypad/Keypad';

describe('Calculator', () => {
  ...

  it('should render the Display and Keypad Components', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.containsAllMatchingElements([
      <Display />,
      <Keypad />
    ])).toEqual(true);
  });
});
```

Failure, as the `Keypad` component does not yet exist.

=====> HEY MICHAEL: Below will follow a similar pattern as above for Display component, and then go in to the Key component
