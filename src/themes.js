import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#222',
    },
    secondary: {
      main: '#fff',
    },
  },
  props: {
    MuiTextField: {
      color: 'secondary',
    },
  },
});
