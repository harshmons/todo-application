import React from 'react';
import { shallow } from 'enzyme';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Header from './Header';

const DEFAULT_PROPS = {
  actions: {
    addTaskListHandler: jest.fn(),
  },
};

describe('<Header />', () => {
  const shallowWrapper = shallow(<Header {...DEFAULT_PROPS} />);

  it('should render <AppBar /> as a parent component with appropriate props', () => {
    expect(shallowWrapper.type()).toBe(AppBar);
    expect(shallowWrapper.prop('position')).toBe('sticky');
  });

  it('should render <Toolbar /> as child of <AppBar />', () => {
    const child = shallowWrapper.children();
    expect(child.type()).toBe(Toolbar);
  });

  it('should render 3 child of <Toolbar />', () => {
    const child = shallowWrapper.children().children();
    expect(child).toHaveLength(3);
  });

  it('should render 1st child of <Toolbar /> as <EventNoteIcon /> with appropriate props', () => {
    const child = shallowWrapper.children().childAt(0);
    expect(child.type()).toBe(EventNoteIcon);
  });

  it('should render 2nd child of <Toolbar /> as <Typography /> with appropriate props', () => {
    const child = shallowWrapper.children().childAt(1);
    expect(child.type()).toBe(Typography);
    expect(child.prop('variant')).toBe('h6');
    expect(child.prop('className')).toMatch('title');
    expect(child.text()).toBe('TODO Application');
  });

  it('should render 3rd child of <Toolbar /> as <AddBoxIcon /> with appropriate props', () => {
    const child = shallowWrapper.children().childAt(2);
    expect(child.type()).toBe(AddBoxIcon);
    expect(child.prop('className')).toMatch('add');
    expect(child.prop('fontSize')).toBe('large');

    child.prop('onClick')();
    expect(DEFAULT_PROPS.actions.addTaskListHandler).toHaveBeenCalledTimes(1);
  });
});
