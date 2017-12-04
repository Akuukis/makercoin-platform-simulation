import * as React from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Table, {TableHead, TableBody, TableRow, TableCell} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import {ComponentRouted} from '../../common/';
import { STORE, PROGRESS, MATURITY } from '../../constants/index';
import { CaseStore } from '../../stores/index';

import ProjectRow from './ProjectRow';

export type ProjectsClasses = 'root';
const styles: StyleRulesCallback<ProjectsClasses> = (theme) => ({
  root: {
  }
});

interface IProjectsProps {
}

@inject(STORE.CASE)
@observer
class Projects extends ComponentRouted<IProjectsProps, ProjectsClasses> {
  case: CaseStore = this.props[STORE.CASE];

  render() {
    return (
      <Paper>
        <Typography align='center' type='headline'>Projects</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='dense'>{'Name'}</TableCell>
              <TableCell padding='dense'>{'Start Week'}</TableCell>
              <TableCell padding='dense'>{'End Week'}</TableCell>
              <TableCell padding='dense'>{'Stage at offering'}</TableCell>
              {/* <TableCell padding='dense'>{'maturity'}</TableCell> */}
              <TableCell padding='dense'>{'Voucher Discount at Offering'}</TableCell>
              <TableCell padding='dense'>{'Voucher Face Value Issued'}</TableCell>
              <TableCell padding='dense'>{'Project Health'}</TableCell>
              <TableCell padding='dense'>{'Project Progress'}</TableCell>
              <TableCell padding='dense'>{'Voucher Market Value'}</TableCell>
              <TableCell padding='dense'>{'Current Status'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...this.case.projects].map((project)=>(
                <ProjectRow key={project.name} project={project} />
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

};
export default withStyles(styles)(Projects);
