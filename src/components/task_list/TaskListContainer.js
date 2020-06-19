import React from 'react';
import { connect } from 'react-redux';
import TaskList from './TaskList';
import { getTaskList, showModal, draggedTask } from '../../store/actions';
import { MODAL_TYPE } from '../../CONSTANTS';

class TaskListContainer extends React.Component {
  componentDidMount() {
    const { getTaskList } = this.props.actions;
    getTaskList();
  }

  render() {
    return <TaskList {...this.props} />;
  }
}

const mapStateToProps = state => {
  const taskList = state.get('taskList');
  return {
    list: taskList.get('taskList').toJS(),
    fetching: taskList.get('fetching'),
    error: taskList.get('error'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getTaskList: () => dispatch(getTaskList()),
      onAddItemHandler: taskId =>
        dispatch(showModal({ modalType: MODAL_TYPE.ADD_ITEM, taskId })),
      onDeleteTaskHandler: taskId =>
        dispatch(showModal({ modalType: MODAL_TYPE.DELETE_TASK_LIST, taskId })),
      onDraggedTaskHandler: (prevTaskId, prevItemId, newTaskId) =>
        dispatch(draggedTask(prevTaskId, prevItemId, newTaskId)),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
