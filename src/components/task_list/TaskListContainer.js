import React from 'react';
import { connect } from 'react-redux';
import TaskList from './TaskList';
import {
  getTaskList,
  draggedTask,
  addItem,
  deleteTaskList,
} from '../../store/actions';

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
      addItemHandler: (taskName, taskId) => dispatch(addItem(taskName, taskId)),
      deleteTaskHandler: taskId => dispatch(deleteTaskList(taskId)),
      draggedItemHandler: (prevTaskId, prevItemId, newTaskId) =>
        dispatch(draggedTask(prevTaskId, prevItemId, newTaskId)),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
