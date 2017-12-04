import * as React from 'react';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, {TableHead, TableBody, TableRow, TableCell} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import {green} from 'material-ui/colors';

import {ComponentRouted, dollar, native, percent} from '../../common/';
import { STORE, PROGRESS, MATURITY, PROJECT_STATUS } from '../../constants/index';
import { ConfigStore } from '../../stores/ConfigStore';
import { Project } from '../../models/Project';

export type NextExitRowClasses = 'root'|'success'|'fail';
const styles: StyleRulesCallback<NextExitRowClasses> = (theme) => ({
  root: {
  },
  success: {
    backgroundColor: green[400],
  },
  fail: {
    backgroundColor: theme.palette.error[400],
  }
});

interface INextExitRowProps {
  project: Project;
}

@observer
class NextExitRow extends ComponentRouted<INextExitRowProps, NextExitRowClasses> {

  @computed get className() {
    if(this.props.project.matured < 1) {
      return undefined;
    } else if(this.props.project.status === PROJECT_STATUS.EXITED) {
      return this.props.classes.success;
    } else {
      return this.props.classes.fail;
    }
  }

  render() {
    return (
      <TableRow className={this.className}>
        <TableCell padding='dense'        >{this.props.project.name}</TableCell>
        <TableCell padding='dense' numeric>{native(this.props.project.value)}</TableCell>
      </TableRow> 
    );
  }

};
export default withStyles(styles)(NextExitRow);
