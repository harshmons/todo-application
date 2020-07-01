import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    margin: '10px 0px',
    padding: '10px 5px',
    border: '2px solid lightgray',
    cursor: 'grab',
    display: 'flex',
  },
  task: {
    wordBreak: 'break-word',
    flexGrow: 1,
  },
  icon: {
    cursor: 'pointer',
  },
});
