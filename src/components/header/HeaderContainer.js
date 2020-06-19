import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { showModal } from '../../store/actions';
import { MODAL_TYPE } from '../../CONSTANTS';

const HeaderContainer = props => {
  return <Header {...props} />;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      addTaskListHandler: () =>
        dispatch(showModal({ modalType: MODAL_TYPE.ADD_TASK_LIST })),
    },
  };
};

export default connect(null, mapDispatchToProps)(HeaderContainer);
