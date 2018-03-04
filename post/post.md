In this post we will cover approaching a React app with Test-Driven Development

Upon completion of this post you will be able to:
- Use TDD to write a React Application 
- Test a React Application with Enzyme and Jest
- Write and use CSS variables
- Create a reusable Component that renders and functions differently based on props
- Use React propTypes to type check component props

## Project Overview

We will be building a basic calculator application consisting of four UI components using Test-Driven Development. We will write for test suites, one for each Component to house the tests. Below are screenshots of the completed components with short descriptions:

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

`$ git clone git_url`
`$ cd react-calculator`
`$ yarn start`

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


## Write Shallow Render Tests and Create Components

### Write `Calculator` Shallow Render Test (Red)

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

The test will fail as the `Calculator` component has not been written. 

### Write `Calculator` Component (Green)

Navigate to *Calculator.jsx* and add the following code:

```jsx
import React from 'react';

const Calculator = () => <div className="calculator-container" />;

export default Calculator;
```

Run the test:

`$ yarn test`

The first test should now pass!

> You may have noticed if you didn't exit the test suite it is still running on the command line. As long as it is running it will continue watching your files for changes and will run the tests on file changes. You may leave it running as you continue through this tutorial, or can exit and run it at your leisure.

### Check for `Display` in `Calculator`

From the mockups we know that the `Calculator` compoponent will contain the Display and Keypad components. Next step is to write a test that checks for the presence of the `Display` component in `Calculator`. Add the test in *Calculator.spec.js*:

```js
import React from 'react';
import {shallow} from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display'

describe('Calculator', () => {
  ...
  
  it('should render the Display component', () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.containsMatchingElement(<Display />)).toEqual(true);
  });
});
```

This test will fail as the `Display` component does not exist.

Before we write the `Display` component, let's add our `Display` test file and setup a shallow render test in the new file like we did with the `Calculator` component. From the command line create *Display.spec.js*:

`$ touch src/components/Display/Display.spec.js`

Write the shallow render test in *Display.spec.jsx*:

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

As the `Display` component still does not exist, the test will fail. Add the component in *Display.jsx* and import `PropTypes`, 

TODO: talk about type checking:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Display = ({displayValue}) => <div className="display-container" />;

Display.propTypes = {displayValue: PropTypes.string.isRequired};

export default Display;
```

Then import and add the `Display` component inside of *Calculator.jsx*. Make sure to pass the `displayValue` prop to `Display`:

```jsx
import React from 'react';
import Display from '../Display/Display';

const Calculator = () => {
  return (
    <div className="calculator-container">
      <Display displayValue="" />
    </div>
  );
}

export default Calculator;
```

Both test suites pass!

### `Display` renders `displayValue` to the DOM

```js
import React from 'react';
import {mount, shallow} from 'enzyme';
import Display from './Display';

describe('Display', () => {
  ...

  it('renders the value of displayValue to the DOM', () => {
    const wrapper = mount(<Display displayValue="test" />);
    expect(wrapper.text()).toEqual('test');;
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

### Add Snapshot Testing for `Display`

Snapshots are not part of TDD as they are generated after a component has been written, but let's add them since we now have the completed component in case of any unexpected changes [TODO]

Add `toMatchSnapshot` in *Display.spec.js* as the first test in the file:

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

### Add `Keypad` Component and Tests

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
      <Display displayValue="" />,
      <Keypad 
        numbers={[]}
        operators={[]}
      />
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

Now add the `jsx` to *Keypad.jsx*:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Keypad = () => <div className="keypad-container" />;

Keypad.propTypes = {
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired,
}

export default Keypad;
```

All pass!

Next test:

### Test for `numbers` and `operators` DOM rendering

In the same way that we tested for the rendering of  the `displayValue` prop in the `Display` component, we will write DOM rednring tests for both the `numbers` and `operators` props in the `Keypad` component. In *Keypad.spec.js* start with  the `numbers` test:

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

> TODO: Note abt keys, only need to be unique to component...

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

Follow the same pattern for 'operators', in *Keypad.spec.js*:

```js
...

describe('Keypad', () => {
  ...

  it('renders the values of opeartors to the DOM', () => {
    const wrapper = mount(<Keypad />);
    expect(wrapper.text()).toEqual('');
    wrapper.setProps({opeartors: ['+', '-', '*', '/']});
    expect(wrapper.text()).toEqual('+-*/');
  });
});
```

Then update *Keypad.jsx*:

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

### Check for `Key` in `Keypad`

Following the same shallow render test pattern we used with the `Display` and `Keypad` components, we will now check for the existence of the `Key` component in `Keypad`. Add the following test in *Keypad.spec.js*:

```js
...
import Key from '../Key/Key';

describe('Keypad', () => {
  ...
  
  it('should render the Key component', () => {
    const wrapper = shallow(<Keypad />);
    expect(wrapper.containsMatchingElement([
      <Key />
    ])).toEqual(true);
  });
});
```

Create the test suite file for the `Key` component:

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

Add the component in *Key.jsx*:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Key = ({keyType, keyValue}) => <div className="key-container" />;

Key.propTypes = {
  keyType: PropTypes.string.isRequired, 
  keyValue: PropTypes.string.isRequired,
}

export default Key;
```

*Key.spec.js* passes, *Keypad.jsx* fails (think that is supposed to be *Keypad.spec.js*)

Import `Key` component in *Keypad.js* and add to `return` statement:

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

### `Key` renders `keyValue` to the DOM

Next, add the `keyValue` prop render test in *Key.spec.jsx*:

```js
...
describe('Key', () => {
  ...

  it('should render the value of keyValue to the DOM', () => {
    const wrapper = shallow(<Key keyType="" keyValue="test" />);
    expect(wrapper.text()).toEqual('test');
  });
});
```

Refactor *Key.jsx*:

```jsx
...
const Key = ({keyType, keyValue}) => {
  return (
    <div className="key-container">
      <p className="key-value">
        {keyValue}
      </p>
    </div>
  );
}
...
```

### Add Snapshot Testing for `Key`

Now that the component UI is mostly complete, add `snapshot` testing. At the top of the tests in add `toMatchSnapshot` in *Key.spec.js*:

```js
...
describe('Key', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Key keyType="" keyValue="" />);
    expect(wrapper).toMatchSnapshot();
  });
...

});
```

TODO: Immediate `snapshot` pass

### Refactor `Keypad` to use `Key` for numbers, operators, submit

Since we want to render a `Key` component for each index of the `numbers` and `operators` props as well as the `submit` Key, we need to add a new render test in *Keypad.spec.js*:

```js
import React from 'react';
import {mount, shallow} from 'enzyme';
import Keypad from './Keypad';
import Key from '../Key/Key';

describe('Keypad', () => {
 
  ...
  it('should render the Key component for each index of numbers, operators, and the submit Key', () => {
    const numbers = ['0', '1'];
    const operators = ['+', '-'];
    const submit = 1;
    const keyTotal = numbers.length + operators.length + submit;
    const wrapper = shallow(<Keypad numbers={numbers} operators={operators} />);
    expect(wrapper.find('Key').length).toEqual(keyTotal);
  });
});
```

Refactor the map functions and the `submit` Key in *Keypad.jsx*:

```jsx
...
const Keypad = ({numbers, operators}) => {

  numbers = numbers.map(number => {
    return (
      <Key 
        key={number}
        keyType="number-key"
        keyValue={number}
      />
    );
  });

  operators = operators.map(operator => {
    return (
      <Key 
        key={operator}
        keyType="operator-key"
        keyValue={operator}
      />
    );
  });

  return (
    <div className="keypad-container">
      ...
      <div className="submit-container">
        <Key
          keyType="submit-key"
          keyValue="="
        />
      </div>
    </div>
  );
}
...
```

After the refactor, `should render the Key component for each index of numbers, operators, and the submit Key` passes, but all the other render tests break because of the addition of the `submit` Key. Refactor DOM render tests in *Keypad.spec.js* to include `=` in output:

```js
import React from 'react';
import {mount, shallow} from 'enzyme';
import Keypad from './Keypad';
import Key from '../Key/Key';

describe('Keypad', () => {
  it('should render 4 <div>\'s', () => {
    const wrapper = shallow(<Keypad numbers={[]} operators={[]} />);
    expect(wrapper.find('div').length).toEqual(4);
  });

  it('renders the values of numbers to the DOM', () => {
    const wrapper = mount(<Keypad numbers={[]} operators={[]} />);
    wrapper.setProps({numbers: ['0', '1', '2']});
    expect(wrapper.text()).toEqual('012=');
  });

  it('renders the values of operators to the DOM', () => {
    const wrapper = mount(<Keypad numbers={[]} operators={[]} />);
    wrapper.setProps({operators: ['+', '-', '*', '/']});
    expect(wrapper.text()).toEqual('+-*/=');
  });

  it('should render the submit Key component', () => {
    const wrapper = mount(<Keypad numbers={[]} operators={[]} />);
    expect(wrapper.containsMatchingElement([
      <Key keyType="submit-key" keyValue="=" />
    ])).toEqual(true);
  });
  ...
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
