import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import {ComponentRouted} from '../common/';

export type DashboardClasses = 'root';
const styles: StyleRulesCallback<DashboardClasses> = (theme) => ({
  root: {
  }
});

interface IDashboardProps {
}

@inject()
@observer
class Dashboard extends ComponentRouted<IDashboardProps, DashboardClasses> {

  render() {
    return (
      <Grid container className={this.props.classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography type={'title'}>
            Hello world
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          Dashboard
        </Grid>
      </Grid>
    );
  }

};
export default withStyles(styles)(Dashboard);
