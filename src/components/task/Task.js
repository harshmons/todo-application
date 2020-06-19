import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ItemContainer from '../item/ItemContainer';
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from './Task.styles';

const allowDrop = e => {
  e.preventDefault();
};
const drop = (newTaskId, callback, e) => {
  const { taskId, itemDetail } = JSON.parse(e.dataTransfer.getData('detail'));
  if (taskId === newTaskId) return;
  callback(taskId, itemDetail.id, newTaskId);
};

const Task = props => {
  const { detail, onAddItem, onDraggedItem, onDeleteTask } = props;
  const classes = useStyles();
  return (
    <div
      onDragOver={allowDrop}
      onDrop={drop.bind(null, detail.id, onDraggedItem)}
      className={classes.root}
    >
      <Card className={classes.card} variant="outlined">
        <CancelIcon
          className={classes.cancel}
          onClick={onDeleteTask.bind(null, detail.name, detail.id)}
        />
        <CardHeader title={detail.name} subheader={detail.description} />
        <CardContent>
          {detail.items.map(item => {
            return (
              <ItemContainer
                key={item.id}
                detail={item}
                taskId={detail.id}
                taskName={detail.name}
              />
            );
          })}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={onAddItem.bind(null, detail.name, detail.id)}
          >
            Add a card
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Task;
