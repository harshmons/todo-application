import React from 'react';
import { connect } from 'react-redux';
import { getTaskLists } from '../../store/actions';
import withToJS from '../../hoc/withToJS';
import TaskLists from './TaskLists';

class TaskListsContainer extends React.Component {
  componentDidMount() {
    const { getTaskLists } = this.props.actions;
    getTaskLists();
  }

  render() {
    return <TaskLists {...this.props} />;
  }
}

const mapStateToProps = state => {
  const taskLists = state.get('taskLists');
  return {
    taskLists: taskLists.get('taskLists'),
    fetching: taskLists.get('fetching'),
    error: taskLists.get('error'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getTaskLists: () => dispatch(getTaskLists()),
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToJS(TaskListsContainer));
