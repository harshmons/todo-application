import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import { deleteItem } from '../../store/actions';

const ItemContainer = props => {
  return <Item {...props} />;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      deleteItemHandler: (taskId, taskName, itemId, itemName) =>
        dispatch(deleteItem(taskId, taskName, itemId, itemName)),
    },
  };
};

export default connect(null, mapDispatchToProps)(ItemContainer);
