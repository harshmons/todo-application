import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import { showModal } from '../../store/actions';
import { MODAL_TYPE } from '../../CONSTANTS';

const ItemContainer = props => {
  return <Item {...props} />;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      deleteItemHandler: (taskId, itemId) =>
        dispatch(
          showModal({ modalType: MODAL_TYPE.DELETE_ITEM, taskId, itemId })
        ),
    },
  };
};

export default connect(null, mapDispatchToProps)(ItemContainer);
