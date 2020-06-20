import React from 'react';
import Task from './Task';
import { connect } from 'react-redux';
import { deleteTask } from '../../store/actions';

const TaskContainer = props => {
  return <Task {...props} />;
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      deleteTaskHandler: (taskListId, taskId, taskName) =>
        dispatch(deleteTask(taskListId, taskId, taskName)),
    },
  };
};

export default connect(null, mapDispatchToProps)(TaskContainer);
