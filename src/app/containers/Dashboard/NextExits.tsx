import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Table, {TableHead, TableBody, TableRow, TableCell} from 'material-ui/Table';
import Typography from 'material-ui/Typography';

import {ComponentRouted, dollar, native} from '../../common/';
import { STORE, PROGRESS, MATURITY, PROJECT_STATUS } from '../../constants/index';
import { CaseStore, TimeStore } from '../../stores/index';

import NextExitRow from './NextExitRow';

export type NextExitsClasses = 'root';
const styles: StyleRulesCallback<NextExitsClasses> = (theme) => ({
  root: {
    padding: '0.5em',
    backgroundColor: theme.palette.grey[300],
  }
});

interface INextExitsProps {
}

@inject(STORE.CASE, STORE.TIME)
@observer
class NextExits extends ComponentRouted<INextExitsProps, NextExitsClasses> {
  case: CaseStore = this.props[STORE.CASE];
  time: TimeStore = this.props[STORE.TIME];

  @computed get filtered() { return [...this.case.projects].filter((p)=>p.maturityTick >= this.time.tick); }
  @computed get sorted() { return this.filtered.sort((a,b)=>a.maturityTick - b.maturityTick); }
  @computed get trimmed() { return this.sorted.slice(0, Math.min(10, this.sorted.length)); }

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography align='center' type={'title'}>Next Exits</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='dense'>{'Name'}</TableCell>
              <TableCell padding='dense'>{'Voucher Market Value'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.trimmed
              .map((project)=>(
                <NextExitRow key={project.name} project={project} />
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

};
export default withStyles(styles)(NextExits);
