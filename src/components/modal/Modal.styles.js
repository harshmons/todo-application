import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    position: 'absolute',
    width: '70%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 30,
  },
  body: {
    marginBottom: theme.spacing(2),
  },
  footer: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));
