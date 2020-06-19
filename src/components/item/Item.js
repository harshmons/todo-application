import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import useStyles from './Item.styles';

const drag = (itemDetail, taskId, e) => {
  console.log('DRAGG STARTED --->', e.target.id);
  e.dataTransfer.setData('detail', JSON.stringify({ itemDetail, taskId }));
};

const Item = props => {
  const { detail, taskId, taskName, actions } = props;
  const classes = useStyles();
  return (
    <div
      id={detail.id}
      className={classes.container}
      draggable
      onDragStart={drag.bind(null, detail, taskId)}
    >
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="body2" color="textPrimary" component="p">
                {detail.name}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <DeleteIcon
                onClick={actions.deleteItemHandler.bind(
                  null,
                  taskId,
                  taskName,
                  detail.id,
                  detail.name
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Item;
