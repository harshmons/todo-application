import {
  GET_TASK_LISTS,
  GET_TASK_LISTS_FAILURE,
  GET_TASK_LISTS_SUCCESS,
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_TASK_LIST,
  ADD_TASK,
  DELETE_TASK_LIST,
  DELETE_TASK,
  DRAGGED_TASK,
  DRAGGED_TASK_FAILURE,
  DRAGGED_TASK_SUCCESS,
  ADD_TASK_LIST_SUCCESS,
  ADD_TASK_LIST_FAILURE,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  DELETE_TASK_LIST_SUCCESS,
  DELETE_TASK_LIST_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from './action_types';
import {
  getTaskLists as getTaskListsApi,
  updateTaskLists as updateTaskListsApi,
} from '../services/api';
import {
  moveTask,
  addTaskList as addTaskListHelper,
  addTask as addTaskHelper,
  deleteTaskList as deleteTaskListHelper,
  deleteTask as deleteTaskHelper,
} from '../utils';

const getTaskLists = () => {
  return dispatch => {
    dispatch({
      type: GET_TASK_LISTS,
    });

    getTaskListsApi()
      .then(d => {
        return dispatch({
          type: GET_TASK_LISTS_SUCCESS,
          payload: d,
        });
      })
      .catch(error =>
        dispatch({
          type: GET_TASK_LISTS_FAILURE,
          payload: error,
        })
      );
  };
};

const showModal = payload => ({
  type: SHOW_MODAL,
  payload,
});

const hideModal = () => ({
  type: HIDE_MODAL,
});

const createTaskList = name => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TASK_LIST,
    });

    const updatedTaskLists = addTaskListHelper(
      name,
      getState().get('taskLists').get('taskLists')
    );

    updateTaskListsApi(updatedTaskLists.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: ADD_TASK_LIST_SUCCESS,
            payload: {
              updatedTaskLists,
            },
          });
        } else {
          dispatch({
            type: ADD_TASK_LIST_FAILURE,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: ADD_TASK_LIST_FAILURE,
          payload: { error },
        });
      });
  };
};

const addTaskList = () => ({
  type: SHOW_MODAL,
  payload: {
    title: 'Add a Task List',
    showNameInput: true,
    primaryActionName: 'Add',
    primaryActionCallback: createTaskList,
    secondaryActionName: 'Cancel',
    secondaryActionCallback: hideModal,
  },
});

const removeTaskList = taskId => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_TASK_LIST,
    });

    const updatedTaskLists = deleteTaskListHelper(
      taskId,
      getState().get('taskLists').get('taskLists')
    );

    updateTaskListsApi(updatedTaskLists.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: DELETE_TASK_LIST_SUCCESS,
            payload: {
              updatedTaskLists,
            },
          });
        } else {
          dispatch({
            type: DELETE_TASK_LIST_FAILURE,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: DELETE_TASK_LIST_FAILURE,
          payload: {
            error,
          },
        });
      });
  };
};

const deleteTaskList = (taskName, taskId) => ({
  type: SHOW_MODAL,
  payload: {
    title: 'Warning',
    message: `Are you sure, you want to delete task list <b>${taskName}</b> ?`,
    showNameInput: false,
    primaryActionName: 'Delete',
    primaryActionCallback: removeTaskList.bind(null, taskId),
    secondaryActionName: 'Cancel',
    secondaryActionCallback: hideModal,
  },
});

const removeTask = (taskListId, taskId) => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_TASK,
    });

    const updatedTaskLists = deleteTaskHelper(
      taskListId,
      taskId,
      getState().get('taskLists').get('taskLists')
    );

    updateTaskListsApi(updatedTaskLists.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: {
              updatedTaskLists,
            },
          });
        } else {
          dispatch({
            type: DELETE_TASK_FAILURE,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: DELETE_TASK_FAILURE,
          payload: { error },
        });
      });
  };
};

const deleteTask = (taskListId, taskId, taskName) => ({
  type: SHOW_MODAL,
  payload: {
    title: 'Warning',
    message: `Are you sure, you want to delete task <b>${taskName}</b> ?`,
    showNameInput: false,
    primaryActionName: 'Delete',
    primaryActionCallback: removeTask.bind(null, taskListId, taskId),
    secondaryActionName: 'Cancel',
    secondaryActionCallback: hideModal,
  },
});

const createTask = (taskListId, taskName) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TASK,
    });

    const updatedTaskLists = addTaskHelper(
      taskName,
      taskListId,
      getState().get('taskLists').get('taskLists')
    );

    updateTaskListsApi(updatedTaskLists.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: ADD_TASK_SUCCESS,
            payload: {
              updatedTaskLists,
            },
          });
        } else {
          dispatch({
            type: ADD_TASK_FAILURE,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: ADD_TASK_FAILURE,
          payload: { error },
        });
      });
  };
};

const addTask = taskListId => ({
  type: SHOW_MODAL,
  payload: {
    title: `Add a Task`,
    showNameInput: true,
    primaryActionName: 'Add',
    primaryActionCallback: createTask.bind(null, taskListId),
    secondaryActionName: 'Cancel',
    secondaryActionCallback: hideModal,
  },
});

const draggedTask = (prevTaskListId, taskId, newTaskListId) => {
  return (dispatch, getState) => {
    dispatch({
      type: DRAGGED_TASK,
    });

    const updatedTaskLists = moveTask(
      prevTaskListId,
      taskId,
      newTaskListId,
      getState().get('taskLists').get('taskLists')
    );

    updateTaskListsApi(updatedTaskLists.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: DRAGGED_TASK_SUCCESS,
            payload: {
              updatedTaskLists,
            },
          });
        } else {
          dispatch({
            type: DRAGGED_TASK_FAILURE,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: DRAGGED_TASK_FAILURE,
          payload: { error },
        });
      });
  };
};

export {
  getTaskLists,
  showModal,
  hideModal,
  addTaskList,
  addTask,
  deleteTaskList,
  deleteTask,
  draggedTask,
};
