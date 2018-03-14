// why does this need to come from node_modules
import {configure} from '../node_modules/enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});