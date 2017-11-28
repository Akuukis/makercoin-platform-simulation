import * as React from 'react';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, {TableHead, TableBody, TableRow, TableCell} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import {ComponentRouted} from '../../common/';
import { STORE, PROGRESS, MATURITY } from '../../constants/index';
import { ConfigStore } from '../../stores/ConfigStore';
import { Project } from '../../models/Project';

export type ProjectRowClasses = 'root';
const styles: StyleRulesCallback<ProjectRowClasses> = (theme) => ({
  root: {
  }
});

interface IProjectRowProps {
  project: Project;
}

@observer
class ProjectRow extends ComponentRouted<IProjectRowProps, ProjectRowClasses> {

  render() {
    return (
      <TableRow>
        <TableCell>{this.props.project.name}</TableCell>
        <TableCell>{this.props.project.birthTick}</TableCell>
        <TableCell>{this.props.project.maturityTick}</TableCell>
        <TableCell>{this.props.project.progress}</TableCell>
        <TableCell>{this.props.project.maturity}</TableCell>
        <TableCell>{this.props.project.discount}</TableCell>
        <TableCell>{this.props.project.size}</TableCell>
        <TableCell>{this.props.project.poisoned ? 'POISONED' : '-'}</TableCell>
        <TableCell>{this.props.project.matured.toFixed(2)}</TableCell>
        <TableCell>{this.props.project.value.toFixed(0)}</TableCell>
        <TableCell>{this.props.project.status}</TableCell>
      </TableRow> 
    );
  }

};
export default withStyles(styles)(ProjectRow);
