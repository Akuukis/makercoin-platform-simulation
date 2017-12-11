import * as React from 'react';
import { IComputedValue } from 'mobx';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import {ComponentRouted, dollar, native} from '../../common/';

export interface IBalanceValues {
  natives: number,
  dollars: number,
  vouchers: number,
}

export type BalanceClasses = 'root';
const styles: StyleRulesCallback<BalanceClasses> = (theme) => ({
  root: {
    padding: '0.5em',
    backgroundColor: theme.palette.grey[300],
  }
});

interface IBalanceProps {
  title: string;
  values: IBalanceValues;
}

@inject()
@observer
class Balance extends ComponentRouted<IBalanceProps, BalanceClasses> {

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography align='center' type={'title'}>{this.props.title}</Typography>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={4}>
            <Typography type={'body2'}>Dollars</Typography>
            {dollar(this.props.values.dollars)}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography type={'body2'}>Vouchers</Typography>
            {this.props.values.vouchers}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography type={'body2'}>MKC: </Typography>
            {native(this.props.values.natives)}
          </Grid>
        </Grid>
      </Paper>
    );
  }

};
export default withStyles(styles)(Balance);
