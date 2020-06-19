import React from 'react';
import MuiModal from '@material-ui/core/Modal';
import useStyles from './Modal.styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Modal = props => {
  // const { show, actions, detail } = props;
  const {
    show,
    title,
    showNameInput,
    showDescriptionInput,
    primaryActionName,
    secondaryActionName,
    primaryActionCallback,
    secondaryActionCallback,
    actions,
  } = props;
  console.log('FROM MODAL -->', props);
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');

  return (
    <MuiModal open={show} onClose={actions.hideModal}>
      <div className={classes.container}>
        <div className={classes.title}>{title}</div>
        {showNameInput && (
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
        {showDescriptionInput && (
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
            disabled={showNameInput && !name.length}
            onClick={() =>
              actions.primaryActionHandler(
                primaryActionCallback &&
                  primaryActionCallback.bind(null, name, desc)
              )
            }
            color="primary"
          >
            {primaryActionName}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              actions.secondaryActionHandler(secondaryActionCallback)
            }
          >
            {secondaryActionName}
          </Button>
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;
