import * as React from 'react';
import { observable, action } from 'mobx';
import {observer, inject} from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';

import {ComponentRouted} from '../../common/';

import Topbar from './Topbar';
import Navigation from './Navigation';

export type AppClasses = 'root'|'content';
const styles: StyleRulesCallback<AppClasses> = (theme) => ({
  '@media (min-width: 0px)': {
    content: {
      paddingTop: '56px',
      height: 'calc(100% - 56px)',
    }
  },
  '@media (min-width: 600px)': {
    content: {
      paddingTop: '64px',
      height: 'calc(100% - 64px)',
    }
  },
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    font: '"Roboto", Helvetica, Arial, sans-serif',
    background: '#f0f0f0',
    // color: '#4d4d4d',
    fontSmoothing: 'antialiased',
    fontWeight: 300,
    overflow: 'auto',
  },
  content: {
    // minWidth: '680px',
    // maxWidth: '960px',
    margin: 'auto',
    paddingLeft: '8px',
    paddingRight: '8px',
  }
});

interface IAppProps {
}

@inject()
@observer
class App extends ComponentRouted<IAppProps, AppClasses> {
  @observable public isDrawerOpen: boolean = false;

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
  };

  @action setDrawer = (open: boolean): void => { this.isDrawerOpen = open; };

  render() {
    return (
        <Paper className={this.props.classes.root}>
          <Drawer
            open={this.isDrawerOpen}
            onRequestClose={()=>this.setDrawer(false)}
          >
            <Navigation onRequestClose={()=>this.setDrawer(false)} />
          </Drawer>
          <Topbar openDrawer={()=>this.setDrawer(true)} />
          <Paper className={this.props.classes.content}>
            {this.props.children}
          </Paper>
          {this.renderDevTool()}
        </Paper>
    );
  }

};
export default withStyles(styles)(App);
