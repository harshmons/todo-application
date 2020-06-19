import { Map, List, fromJS } from 'immutable';
import {
  GET_TASK_LIST,
  GET_TASK_LIST_SUCCESS,
  GET_TASK_LIST_FAILURE,
  DRAGGED_TASK_SUCCESS,
  ADD_TASK_LIST_SUCCESS,
  ADD_ITEM_SUCCESS,
  DELETE_TASK_LIST_SUCCESS,
  DELETE_ITEM_SUCCESS,
} from '../action_types';

export const DEFAULT_STATE = Map({
  taskList: List([]),
  fetching: false,
  error: null,
  showModal: false,
});

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_TASK_LIST: {
      return state.merge({ fetching: true });
    }
    case GET_TASK_LIST_SUCCESS: {
      const { payload } = action;
      return state.merge({
        taskList: fromJS(payload),
        fetching: false,
      });
    }
    case GET_TASK_LIST_FAILURE: {
      const { payload } = action;
      return state.merge({
        error: payload,
        fetching: false,
      });
    }
    case DRAGGED_TASK_SUCCESS: {
      const { updatedTaskList } = action.payload;
      return state.merge({
        taskList: updatedTaskList,
      });
    }
    case ADD_TASK_LIST_SUCCESS:
    case ADD_ITEM_SUCCESS:
    case DELETE_TASK_LIST_SUCCESS:
    case DELETE_ITEM_SUCCESS: {
      const { updatedTaskList } = action.payload;
      return state.merge({
        taskList: updatedTaskList,
      });
    }
    default:
      return state;
  }
}
