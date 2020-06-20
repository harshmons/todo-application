import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 30,
    top: '30%',
    left: '30%',
  },
  header: {},
  body: {
    marginBottom: theme.spacing(2),
  },
  footer: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));
