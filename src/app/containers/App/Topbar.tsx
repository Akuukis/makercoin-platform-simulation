import * as React from 'react';
import { observable, action } from 'mobx';
import {observer, inject} from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui-icons/Menu';

import {Component} from "../../common/";

import { STORE } from '../../constants';
import { TimeStore } from '../../stores/index';
import { Button } from 'material-ui';

export type TopbarClasses = 'root'|'button';
const styles: StyleRulesCallback<TopbarClasses> = (theme) => ({
  root: {
  },
  button: {
    margin: '0em 0.5em',
  }
});

interface ITopbarProps {
  openDrawer: (open: boolean) => void,
}

@inject(STORE.TIME)
@observer
class Topbar extends Component<ITopbarProps, TopbarClasses> {
  time: TimeStore = this.props[STORE.TIME];

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AppBar elevation={0} className={this.props.classes.root}>
        <Toolbar>
          <IconButton onClick={()=>this.props.openDrawer(true)}>
            <IconMenu />
          </IconButton>
          <Typography type="headline" style={{flex:1}}>
            {'Makercoin Platform Simulation'}
          </Typography>
          <Typography type="title">
            {`Step #${this.time.tick.toFixed(0)}`}
          </Typography>
          <Button raised className={this.props.classes.button} color="default" onClick={()=>this.time.reset()}>Reset</Button>
          <Button raised className={this.props.classes.button} color="primary" onClick={()=>this.time.start(1)}>Start</Button>
          <Button raised className={this.props.classes.button} color="accent" onClick={()=>this.time.stop()}>Stop</Button>
          <Button raised className={this.props.classes.button} color="primary" onClick={()=>this.time.step(1)}>1 Step</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
export default withStyles(styles)(Topbar);
