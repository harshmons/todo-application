import {
  GET_TASK_LIST,
  GET_TASK_LIST_FAILURE,
  GET_TASK_LIST_SUCCESS,
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_TASK_LIST,
  ADD_ITEM,
  DELETE_TASK_LIST,
  DELETE_ITEM,
  DRAGGED_TASK,
  DRAGGED_TASK_FAILURE,
  DRAGGED_TASK_SUCCESS,
  ADD_TASK_LIST_SUCCESS,
  ADD_TASK_LIST_FAILURE,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  DELETE_TASK_LIST_SUCCESS,
  DELETE_TASK_LIST_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from './action_types';
import {
  getTaskList as getTaskListApi,
  updateTaskList as updateTaskListAPI,
} from '../services/api';
import {
  moveItemToAnotherTask,
  addNewTaskInTaskList,
  addItemInATask,
  deleteTaskFromTaskList,
  deleteItemFromATask,
} from '../utils';

const getTaskList = () => {
  return dispatch => {
    dispatch({
      type: GET_TASK_LIST,
    });

    getTaskListApi()
      .then(d => {
        return dispatch({
          type: GET_TASK_LIST_SUCCESS,
          payload: d,
        });
      })
      .catch(error =>
        dispatch({
          type: GET_TASK_LIST_FAILURE,
          payload: error,
        })
      );
  };
};

const showModal = ({ modalType, taskId, itemId }) => {
  return {
    type: SHOW_MODAL,
    payload: {
      modalType,
      taskId,
      itemId,
    },
  };
};

const hideModal = () => ({
  type: HIDE_MODAL,
});

const createTaskList = (name, description) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TASK_LIST,
    });

    const updatedTaskList = addNewTaskInTaskList(
      name,
      description,
      getState().get('taskList').get('taskList')
    );

    updateTaskListAPI(updatedTaskList.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: ADD_TASK_LIST_SUCCESS,
            payload: {
              updatedTaskList,
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
    title: 'Add a Task in the Task List',
    showNameInput: true,
    showDescriptionInput: true,
    primaryActionName: 'Add',
    primaryActionCallback: createTaskList,
    secondaryActionName: 'Cancel',
    secondaryActionCallback: null,
  },
});

const removeTaskList = taskId => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_TASK_LIST,
    });

    const updatedTaskList = deleteTaskFromTaskList(
      taskId,
      getState().get('taskList').get('taskList')
    );

    updateTaskListAPI(updatedTaskList.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: DELETE_TASK_LIST_SUCCESS,
            payload: {
              updatedTaskList,
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

const deleteTaskList = (taskId, taskName) => ({
  type: SHOW_MODAL,
  payload: {
    title: `Are you sure, you want to delete task ${taskName}?`,
    showNameInput: false,
    showDescriptionInput: false,
    primaryActionName: 'Delete',
    primaryActionCallback: removeTaskList.bind(null, taskId),
    secondaryActionName: 'Cancel',
    secondaryActionCallback: null,
  },
});

const removeItem = (taskId, itemId) => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_ITEM,
    });

    const updatedTaskList = deleteItemFromATask(
      taskId,
      itemId,
      getState().get('taskList').get('taskList')
    );

    updateTaskListAPI(updatedTaskList.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: DELETE_ITEM_SUCCESS,
            payload: {
              updatedTaskList,
            },
          });
        } else {
          dispatch({
            type: DELETE_ITEM_FAILURE,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: DELETE_ITEM_FAILURE,
          payload: { error },
        });
      });
  };
};

const deleteItem = (taskId, taskName, itemId, itemName) => ({
  type: SHOW_MODAL,
  payload: {
    title: `Are you sure, you want to delete item ${itemName} from task ${taskName}?`,
    showNameInput: false,
    showDescriptionInput: false,
    primaryActionName: 'Delete',
    primaryActionCallback: removeItem.bind(null, taskId, itemId),
    secondaryActionName: 'Cancel',
    secondaryActionCallback: null,
  },
});

const createItem = (taskId, name) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_ITEM,
    });

    const updatedTaskList = addItemInATask(
      name,
      taskId,
      getState().get('taskList').get('taskList')
    );

    updateTaskListAPI(updatedTaskList.toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: ADD_ITEM_SUCCESS,
            payload: {
              updatedTaskList,
            },
          });
        } else {
          dispatch({
            type: ADD_ITEM_FAILURE,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: ADD_ITEM_FAILURE,
          payload: { error },
        });
      });
  };
};

const addItem = (taskName, taskId) => ({
  type: SHOW_MODAL,
  payload: {
    title: `Add a Item in the Task ${taskName}`,
    showNameInput: true,
    showDescriptionInput: false,
    primaryActionName: 'Add',
    primaryActionCallback: createItem.bind(null, taskId),
    secondaryActionName: 'Cancel',
    secondaryActionCallback: null,
  },
});

const draggedTask = (prevTaskId, prevItemId, newTaskId) => {
  return (dispatch, getState) => {
    dispatch({
      type: DRAGGED_TASK,
    });

    const newState = moveItemToAnotherTask(
      prevTaskId,
      prevItemId,
      newTaskId,
      getState().get('taskList')
    );

    updateTaskListAPI(newState.get('taskList').toJS())
      .then(response => {
        if (response.status === 'success') {
          dispatch({
            type: DRAGGED_TASK_SUCCESS,
            payload: {
              updatedTaskList: newState.get('taskList'),
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
  getTaskList,
  showModal,
  hideModal,
  addTaskList,
  addItem,
  deleteTaskList,
  deleteItem,
  draggedTask,
};
