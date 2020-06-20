import reducer, { DEFAULT_STATE } from './modalReducer';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_TASK_LIST_SUCCESS,
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_LIST_SUCCESS,
} from '../action_types';

describe('modalReducer', () => {
  it('should return the expected state when action.type is `SHOW_MODAL`', () => {
    const action = {
      type: SHOW_MODAL,
      payload: {
        title: 'Sample Title',
        message: 'Sample Message',
        showNameInput: true,
      },
    };
    const expectedState = DEFAULT_STATE.merge({
      show: true,
      ...action.payload,
    });
    expect(reducer(DEFAULT_STATE, action)).toStrictEqual(expectedState);
  });

  it('should return DEFAULT_STATE when action.type is `ADD_TASK_LIST_SUCCESS`', () => {
    const action = {
      type: ADD_TASK_LIST_SUCCESS,
    };
    expect(reducer(DEFAULT_STATE, action)).toStrictEqual(DEFAULT_STATE);
  });

  it('should return DEFAULT_STATE when action.type is `ADD_TASK_SUCCESS`', () => {
    const action = {
      type: ADD_TASK_SUCCESS,
    };
    expect(reducer(DEFAULT_STATE, action)).toStrictEqual(DEFAULT_STATE);
  });

  it('should return DEFAULT_STATE when action.type is `DELETE_TASK_LIST_SUCCESS`', () => {
    const action = {
      type: DELETE_TASK_LIST_SUCCESS,
    };
    expect(reducer(DEFAULT_STATE, action)).toStrictEqual(DEFAULT_STATE);
  });

  it('should return DEFAULT_STATE when action.type is `DELETE_TASK_SUCCESS`', () => {
    const action = {
      type: DELETE_TASK_SUCCESS,
    };
    expect(reducer(DEFAULT_STATE, action)).toStrictEqual(DEFAULT_STATE);
  });

  it('should return DEFAULT_STATE when action.type is `HIDE_MODAL`', () => {
    const action = {
      type: HIDE_MODAL,
    };
    expect(reducer(DEFAULT_STATE, action)).toStrictEqual(DEFAULT_STATE);
  });

  it('should return DEFAULT_STATE when action.type is not matched', () => {
    const action = {
      type: 'DUMMY_ACTION',
    };
    expect(reducer(DEFAULT_STATE, action)).toStrictEqual(DEFAULT_STATE);
  });
});
