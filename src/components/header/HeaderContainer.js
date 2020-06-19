import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { addTaskList } from '../../store/actions';

const HeaderContainer = props => {
  return <Header {...props} />;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      addTaskListHandler: () => dispatch(addTaskList()),
    },
  };
};

export default connect(null, mapDispatchToProps)(HeaderContainer);
