/* eslint-disable no-unused-vars */
import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../../app.js';

describe('<App />', () => {

  it('exists at the start of the application', () => {
    let app = shallow(<App />);
    expect(app.find('div').exists()).toBeTruthy();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<BrowserRouter><App /></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});