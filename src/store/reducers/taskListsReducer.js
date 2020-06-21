import { Map, List, fromJS } from 'immutable';
import {
  GET_TASK_LISTS,
  GET_TASK_LISTS_SUCCESS,
  GET_TASK_LISTS_FAILURE,
  DRAGGED_TASK_SUCCESS,
  ADD_TASK_LIST_SUCCESS,
  ADD_TASK_SUCCESS,
  DELETE_TASK_LIST_SUCCESS,
  DELETE_TASK_SUCCESS,
} from '../action_types';

export const DEFAULT_STATE = Map({
  taskLists: List([]),
  fetching: false,
  error: null,
  showModal: false,
});

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_TASK_LISTS: {
      return state.merge({ fetching: true });
    }
    case GET_TASK_LISTS_SUCCESS: {
      const { payload } = action;
      return state.merge({
        taskLists: fromJS(payload),
        fetching: false,
      });
    }
    case GET_TASK_LISTS_FAILURE: {
      const { payload } = action;
      return state.merge({
        error: payload,
        fetching: false,
      });
    }
    case DRAGGED_TASK_SUCCESS: {
      const { updatedTaskLists } = action.payload;
      return state.merge({
        taskLists: updatedTaskLists,
      });
    }
    case ADD_TASK_LIST_SUCCESS:
    case ADD_TASK_SUCCESS:
    case DELETE_TASK_LIST_SUCCESS:
    case DELETE_TASK_SUCCESS: {
      const { updatedTaskLists } = action.payload;
      return state.merge({
        taskLists: updatedTaskLists,
      });
    }
    default:
      return state;
  }
}
