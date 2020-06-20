import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import { hideModal } from '../../store/actions';

const ModalContainer = props => {
  return <Modal {...props} />;
};

const mapStateToProps = state => {
  const modal = state.get('modal');
  return {
    show: modal.get('show'),
    title: modal.get('title'),
    message: modal.get('message'),
    showNameInput: modal.get('showNameInput'),
    primaryActionName: modal.get('primaryActionName'),
    secondaryActionName: modal.get('secondaryActionName'),
    primaryActionCallback: modal.get('primaryActionCallback'),
    secondaryActionCallback: modal.get('secondaryActionCallback'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      hideModal: () => dispatch(hideModal()),
      primaryActionHandler: callback => callback && dispatch(callback()),
      secondaryActionHandler: callback => callback && dispatch(callback()),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
