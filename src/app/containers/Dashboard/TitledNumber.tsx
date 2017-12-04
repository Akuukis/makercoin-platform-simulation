import * as React from 'react';
import { computed, IComputedValue } from 'mobx';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Table, {TableHead, TableBody, TableRow, TableCell} from 'material-ui/Table';
import Typography from 'material-ui/Typography';

import {ComponentRouted} from '../../common/';

export type TitledNumberClasses = 'root';
const styles: StyleRulesCallback<TitledNumberClasses> = (theme) => ({
  root: {
    padding: '0.5em',
    backgroundColor: theme.palette.grey[300],
  }
});

interface ITitledNumberProps {
  title: string;
  value: IComputedValue<string>;
}

@observer
class TitledNumber extends ComponentRouted<ITitledNumberProps, TitledNumberClasses> {

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography align='center' type={'title'}>{this.props.title}</Typography>
        <Typography align='center' type={'display1'}>{this.props.value.get()}</Typography>
      </Paper>
    );
  }

};
export default withStyles(styles)(TitledNumber);
