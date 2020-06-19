import React from 'react';
import MuiModal from '@material-ui/core/Modal';
import useStyles from './Modal.styles';
import Button from '@material-ui/core/Button';
import { MODAL_TYPE } from '../../CONSTANTS';
import TextField from '@material-ui/core/TextField';

const getModalTitle = modalType => {
  switch (modalType) {
    case MODAL_TYPE.ADD_TASK_LIST:
      return 'Add Task List';
    case MODAL_TYPE.ADD_ITEM:
      return 'Add Item';
    case MODAL_TYPE.DELETE_ITEM:
      return 'Deleting Item';
    case MODAL_TYPE.DELETE_TASK_LIST:
      return 'Deleting Task List';
    default:
      return '';
  }
};

const getButtonTitle = modalType => {
  switch (modalType) {
    case MODAL_TYPE.ADD_TASK_LIST:
    case MODAL_TYPE.ADD_ITEM:
      return 'Add';
    case MODAL_TYPE.DELETE_ITEM:
    case MODAL_TYPE.DELETE_TASK_LIST:
      return 'Delete';
    default:
      return '';
  }
};

const Modal = props => {
  const { show, actions, detail } = props;
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');

  console.log('FROM MODAL -->', detail);
  return (
    <MuiModal open={show} onClose={actions.hideModal}>
      <div className={classes.container}>
        <div className={classes.title}>{getModalTitle(detail.modalType)}</div>
        {(detail.modalType === MODAL_TYPE.ADD_ITEM ||
          detail.modalType === MODAL_TYPE.ADD_TASK_LIST) && (
          <div>
            <TextField
              required
              id="standard-required"
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        )}
        {detail.modalType === MODAL_TYPE.ADD_TASK_LIST && (
          <div>
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              rowsMax={4}
              value={desc}
              onChange={e => {
                setDesc(e.target.value);
              }}
            />
          </div>
        )}
        <div className={classes.action}>
          <Button
            variant="contained"
            disabled={
              (detail.modalType === MODAL_TYPE.ADD_TASK_LIST ||
                detail.modalType === MODAL_TYPE.ADD_ITEM) &&
              !name.length
            }
            onClick={
              detail.modalType === MODAL_TYPE.ADD_TASK_LIST ||
              detail.modalType === MODAL_TYPE.ADD_ITEM
                ? actions.onAddHandler.bind(
                    null,
                    detail.modalType,
                    name,
                    desc,
                    detail.taskId
                  )
                : actions.onDeleteHandler.bind(
                    null,
                    detail.modalType,
                    detail.taskId,
                    detail.itemId
                  )
            }
          >
            {getButtonTitle(detail.modalType)}
          </Button>
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;
