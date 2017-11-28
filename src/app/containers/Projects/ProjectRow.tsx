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
        <TableCell padding='dense'        >{this.props.project.name}</TableCell>
        <TableCell padding='dense' numeric>{this.props.project.birthTick}</TableCell>
        <TableCell padding='dense' numeric>{this.props.project.maturityTick}</TableCell>
        <TableCell padding='dense'        >{this.props.project.progress}</TableCell>
        <TableCell padding='dense'        >{this.props.project.maturity}</TableCell>
        <TableCell padding='dense' numeric>{this.props.project.discount.toFixed(2)}</TableCell>
        <TableCell padding='dense' numeric>{this.props.project.size}</TableCell>
        <TableCell padding='dense'        >{this.props.project.poisoned ? 'POISONED' : '-'}</TableCell>
        <TableCell padding='dense' numeric>{this.props.project.matured.toFixed(2)}</TableCell>
        <TableCell padding='dense' numeric>{this.props.project.value.toFixed(0)}</TableCell>
        <TableCell padding='dense'        >{this.props.project.status}</TableCell>
      </TableRow> 
    );
  }

};
export default withStyles(styles)(ProjectRow);
