import * as React from 'react';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { purple, green, red } from 'material-ui/colors';

import {ComponentRouted} from '../common/';

const theme = createMuiTheme({
  palette: {
    primary: purple, // Purple and green play nicely together.
    accent: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
});

export default class Theme extends ComponentRouted<{}, ''> {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
};
