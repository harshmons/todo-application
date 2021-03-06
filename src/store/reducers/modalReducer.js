import { Map } from 'immutable';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_TASK_LIST_SUCCESS,
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_LIST_SUCCESS,
  EDIT_TASK_LIST_NAME_SUCCESS,
  EDIT_TASK_NAME_SUCCESS,
} from '../action_types';

export const DEFAULT_STATE = Map({
  show: false,
  title: '',
  message: '',
  showNameInput: true,
  nameInputValue: '',
  primaryActionName: '',
  primaryActionCallback: null,
  secondaryActionName: '',
  secondaryActionCallback: null,
});

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      const { payload } = action;
      return state.merge({
        show: true,
        ...payload,
      });
    }
    case ADD_TASK_LIST_SUCCESS:
    case ADD_TASK_SUCCESS:
    case DELETE_TASK_LIST_SUCCESS:
    case DELETE_TASK_SUCCESS:
    case EDIT_TASK_LIST_NAME_SUCCESS:
    case EDIT_TASK_NAME_SUCCESS:
    case HIDE_MODAL:
      return DEFAULT_STATE;
    default:
      return state;
  }
}
