import React from 'react';
import MuiModal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import useStyles from './Modal.styles';

const Modal = props => {
  const {
    show,
    title,
    message,
    showNameInput,
    nameInputValue,
    primaryActionName,
    secondaryActionName,
    primaryActionCallback,
    secondaryActionCallback,
    actions,
  } = props;
  const classes = useStyles();

  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setName(nameInputValue);
  }, [nameInputValue]);

  const onClose = () => {
    actions.hideModal();
    setName('');
  };

  const onPrimaryAction = () => {
    actions.primaryActionHandler(
      primaryActionCallback && primaryActionCallback.bind(null, name)
    );
    setName('');
  };

  const onSecondaryAction = () => {
    actions.secondaryActionHandler(secondaryActionCallback);
  };

  return (
    <MuiModal
      open={show}
      onClose={onClose}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <div className={classes.container}>
        <Typography variant="h5" color="textPrimary">
          {title}
        </Typography>
        <div className={classes.body}>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: message }}
          ></Typography>
          {showNameInput && (
            <form
              onSubmit={e => {
                e.preventDefault();
                onPrimaryAction();
              }}
            >
              <TextField
                required
                label="Name"
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
                inputRef={ref => ref && ref.focus()}
              />
            </form>
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
