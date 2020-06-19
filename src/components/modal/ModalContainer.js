import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import {
  hideModal,
  modalAddAction,
  modalDeleteAction,
} from '../../store/actions';

const ModalContainer = props => {
  return <Modal {...props} />;
};

const mapStateToProps = state => {
  const modal = state.get('modal');
  return {
    show: modal.get('show'),
    detail: modal.get('detail').toJS(),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      hideModal: () => dispatch(hideModal()),
      onAddHandler: (modalType, name, desc, taskId) =>
        dispatch(modalAddAction(modalType, name, desc, taskId)),
      onDeleteHandler: (modalType, taskId, itemId) =>
        dispatch(modalDeleteAction(modalType, taskId, itemId)),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
