import React from 'react';
import MuiModal from '@material-ui/core/Modal';
import useStyles from './Modal.styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

const Modal = props => {
  const {
    show,
    title,
    message,
    showNameInput,
    primaryActionName,
    secondaryActionName,
    primaryActionCallback,
    secondaryActionCallback,
    actions,
  } = props;
  const classes = useStyles();

  const [name, setName] = React.useState('');

  const onClose = () => {
    setName('');
    actions.hideModal();
  };

  const onPrimaryAction = () => {
    setName('');
    actions.primaryActionHandler(
      primaryActionCallback && primaryActionCallback.bind(null, name)
    );
  };

  const onSecondaryAction = () => {
    actions.secondaryActionHandler(secondaryActionCallback);
  };

  return (
    <MuiModal open={show} onClose={onClose}>
      <div className={classes.container}>
        <Typography variant="h5">{title}</Typography>
        <div className={classes.body}>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: message }}
          ></Typography>
          {showNameInput && (
            <TextField
              required
              label="Name"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}
        </div>
        <div className={classes.footer}>
          <Button
            variant="contained"
            disabled={showNameInput && !name.length}
            onClick={onPrimaryAction}
            color="primary"
          >
            {primaryActionName}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onSecondaryAction}
          >
            {secondaryActionName}
          </Button>
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;
