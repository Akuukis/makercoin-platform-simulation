import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';

import {Component} from "../../common/";
import { RouterStore } from './../../stores/';
import { NAVIGATION, STORE } from './../../constants/';

export type NavigationClasses = 'root'|'button';
const styles: StyleRulesCallback<NavigationClasses> = (theme) => ({
  root: {
  },
  button: {
    margin: '0em 0.5em',
  }
});

interface INavigationProps {
    onRequestClose: ()=>void;
}

@inject(STORE.ROUTER)
@observer
class Navigation extends Component<INavigationProps, NavigationClasses> {

  constructor(props) {
    super(props);
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const router = this.props[STORE.ROUTER] as RouterStore;
    const path = event.currentTarget.getAttribute('value');
    router.push(path);
    this.props.onRequestClose();
  }

  render() {
    return (<List>
        <ListItem button onClick={this.handleClick} value={NAVIGATION.CONFIG   }><ListItemText primary='Configuration' /></ListItem>
        <ListItem button onClick={this.handleClick} value={NAVIGATION.DASHBOARD}><ListItemText primary='Dashboard' /></ListItem>
        <ListItem button onClick={this.handleClick} value={NAVIGATION.PROJECTS }><ListItemText primary='Projects' /></ListItem>
        <ListItem button onClick={this.handleClick} value={NAVIGATION.HISTORY  }><ListItemText primary='History' /></ListItem>
      </List>);
  }

}
export default withStyles(styles)(Navigation);
