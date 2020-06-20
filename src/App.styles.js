import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  taskListsContainer: {
    padding: 20,
    minHeight: 'calc(100vh - 104px)',
    background: '#E6E6FA',
  },
}));
