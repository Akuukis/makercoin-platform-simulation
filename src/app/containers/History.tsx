import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import {ComponentRouted} from '../common/';

export type HistoryClasses = 'root';
const styles: StyleRulesCallback<HistoryClasses> = (theme) => ({
  root: {
  }
});

interface IHistoryProps {
}

@inject()
@observer
class History extends ComponentRouted<IHistoryProps, HistoryClasses> {

  render() {
    return (
      <Grid container className={this.props.classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography type={'title'}>
            Hello world
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          History
        </Grid>
      </Grid>
    );
  }

};
export default withStyles(styles)(History);
