import React from 'react';
import TaskList from './TaskList';
import { connect } from 'react-redux';
import { draggedTask, addTask, deleteTaskList } from '../../store/actions';

const TaskListContainer = props => <TaskList {...props} />;

const mapStateToProps = state => {
  const taskLists = state.get('taskLists');
  return {
    taskLists: taskLists.get('taskLists').toJS(),
    fetching: taskLists.get('fetching'),
    error: taskLists.get('error'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      addTaskHandler: taskListId => dispatch(addTask(taskListId)),
      deleteTaskListHandler: (taskName, taskId) =>
        dispatch(deleteTaskList(taskName, taskId)),
      draggedTaskHandler: (prevTaskListId, taskId, newTaskListId) =>
        dispatch(draggedTask(prevTaskListId, taskId, newTaskListId)),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
