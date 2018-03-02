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

Before we write the `Keypad` component, let's follow the pattern we used with the `Display` component. First we need to add *Keypad.spec.js* from the command line:

`$ touch src/components/Keypad/Keypad.spec.js`

Then add the `Keypad` shallow render test in *Keypad.spec.js*:

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

More fail.

Now update *Keypad.jsx* with the following:

```jsx
import React from 'react';

const Keypad = () => <div className="keypad-container" />;

export default Keypad;
```

All pass!

Next, test that the `defaultProps` exists and are settable. In *Keypad.spec.js* add the following, don't forget to import `mount`:

```js
import React from 'react';
import {mount, shallow} from 'enzyme';
import Keypad from './Keypad';

describe('Keypad', () => {
  ...

  it('has default props numbers and operators', () => {
    const wrapper = mount(<Keypad />);
    expect(wrapper.prop('numbers')).toEqual([]);
    expect(wrapper.prop('operators')).toEqual([]);
  });

  it('has settable props numbers and operators', () => {
    const wrapper = mount(<Keypad />);
    wrapper.setProps({numbers: ['test']});
    expect(wrapper.prop('numbers')).toEqual(['test']);
    wrapper.setProps({operators: ['test']});
    expect(wrapper.prop('operators')).toEqual(['test']);
  });
});
```

Fail time.

Update *Keypad.jsx* with `PropTypes` and `defaultProps`:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Keypad = () => <div className="keypad-container" />;

Keypad.propTypes = {
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired,
}

Keypad.defaultProps = {
  numbers: [],
  operators: [],
}

export default Keypad;
```

Next test:

Test for `numbers` DOM rendering:

Update *Keypad.spec.js* with the test. Because we only want the values of the `numbers` prop, we will wrap the... blah, numbers-container:

```js
...

describe('Keypad', () => {
  ...

  it('renders the values of numbers to the DOM', () => {
    const wrapper = mount(<Keypad />);
    expect(wrapper.text()).toEqual('');
    wrapper.setProps({numbers: ['0', '1', '2']});
    expect(wrapper.text()).toEqual('012');
  });
});
```

Then update *Keypad.jsx*:

```jsx
...
const Keypad = ({numbers}) => {

  numbers = numbers.map(number => {
    return (
      <p key={number}>{number}</p>
    );
  });

  return (
    <div className="keypad-container">
      <div className="numbers-container">
        {numbers}
      </div>
    </div>
  );
}
...
```

> Note abt keys, only need to be unique to component...

Breaks `should render a <div />`. Update the test:

```jsx
...
describe('Keypad', () => {
  it('should render 2 <div>\'s', () => {
    const wrapper = shallow(<Keypad />);
    expect(wrapper.find('div').length).toEqual(2);
  });

  ...
});
```

All pass!!!!!

Follow the same pattern for 'operators':

Update *Keypad.jsx*:
```jsx
...
const Keypad = ({numbers, operators}) => {

  numbers = numbers.map(number => {
    return (
      <p key={number}>{number}</p>
    );
  });

  operators = operators.map(operator => {
    return (
      <p key={operator}>{operator}</p>
    );
  });

  return (
    <div className="keypad-container">
      <div className="numbers-container">
        {numbers}
      </div>
      <div className="operators-container">
        {operators}
      </div>
    </div>
  );
}
...
```

Breaks `should render 2 <div>'s`. Update the test:

```jsx
...
describe('Keypad', () => {
  it('should render 3 <div>\'s', () => {
    const wrapper = shallow(<Keypad />);
    expect(wrapper.find('div').length).toEqual(3);
  });

  ...
});
```

Tests are ok....

### Add Key Compoment Test

add render test in *Keypad.spec.js*:

```js
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

Create test file:

`$ touch src/components/Key/Key.spec.js`

Create shallow render test for `Key` in *Key.spec.js*:

```js
import React from 'react';
import {shallow, mount} from 'enzyme';
import Key from './Key';

describe('Key', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Key />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
```

Add component in *Key.jsx*:

```jsx
import React from 'react';

const Key = () => <div className="key-container" />;

export default Key;
```

*Key.spec.js* passes, *Keypad.jsx* fails

Import `Key` component in *Keypad.js* and call in component:

```jsx
...
import Key from '../Key/Key';

const Keypad = ({numbers, operators}) => {
  ...
  return (
    <div className="keypad-container">
      <div className="numbers-container">
        {numbers}
      </div>
      <div className="operators-container">
        {operators}
      </div>
      <Key />
    </div>
  );
}
...
```

ALL PASS

### More Key Tests

Next, test that the `defaultProps` exists and are settable. In *Key.spec.js* add the following, don't forget to import `mount`:
```jsx
import React from 'react';
import {shallow, mount} from 'enzyme';
import Key from './Key';

describe('Key', () => {
  ...
  it('has default props keyAction and KeyType', () => {
    const wrapper = mount(<Key />);
    expect(wrapper.prop('keyType')).toEqual('default');
    expect(wrapper.prop('keyAction')).toEqual('default');
  });

  it('has settable props keyAction and KeyType', () => {
    const wrapper = mount(<Key />);
    wrapper.setProps({keyAction: 'test'});
    expect(wrapper.prop('keyAction')).toEqual('test');
    wrapper.setProps({keyType: 'test'});
    expect(wrapper.prop('keyType')).toEqual('test');
  });
});
```

########### Start here ################################## Start here #######################
########### Start here ################################## Start here #######################
########### Start here ################################## Start here #######################
########### Start here ################################## Start here #######################

> Function tests for updateDisplay
displayValue = Infinty => '0'
displayValue = NaN => '0'
length of displayValue cannot be greater than 9 chars
Error [operator] number = '0' 
If '.' is present no adding '.'

> function tests for callOperator
If 'submit' and no storedValue or selectedOperator, return 0

(fixed but should write a test) weird behavior of calculator:
enter 10, press +, then press -, then 2, then =. should equal 12, instead equals -2.
storedValue is getting updated to 0 when the second operator (-) is entered
