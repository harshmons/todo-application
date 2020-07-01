import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    position: 'relative',
    cursor: 'grab',
  },
  cardHeaderContent: {
    width: '100%',
  },
  cardHeaderTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  cardContent: {
    height: 250,
    overflow: 'auto',
  },
  cancel: {
    cursor: 'pointer',
    position: 'absolute',
    top: 2,
    right: 2,
  },
  edit: {
    cursor: 'pointer',
    fontSize: '1.2rem',
    marginLeft: '10px',
  },
});
