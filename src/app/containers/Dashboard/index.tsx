import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import {ComponentRouted, native} from '../../common/';

import Balance from "./Balance";
import NextExits from './NextExits';
import TitledNumber from './TitledNumber';
import { STORE, PROJECT_STATUS } from '../../constants/index';
import { CaseStore, TimeStore } from '../../stores/index';

export type DashboardClasses = 'root';
const styles: StyleRulesCallback<DashboardClasses> = (theme) => ({
  root: {
    padding: '0.5em',
  }
});

interface IDashboardProps {
}

@inject(STORE.CASE, STORE.TIME)
@observer
class Dashboard extends ComponentRouted<IDashboardProps, DashboardClasses> {
  case: CaseStore = this.props[STORE.CASE];
  time: TimeStore = this.props[STORE.TIME];

  render() {
    const counted = computed(()=>{
      return [...this.case.projects].filter((p)=>p.maturityTick >= this.time.tick);
    })
    const totalOutstanding = computed(()=>{
      return native(counted.get().reduce((sum, p)=>sum+p.purchasePrice, 0))
    })

    const totalValue = computed(()=>{
      return native(counted.get().reduce((sum, p)=>sum+p.value, 0))
    })

    return (
      <Paper className={this.props.classes.root}>
        <Typography align='center' type='headline'>Dashboard</Typography>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <TitledNumber value={totalOutstanding} title='Total Offerings outstanding - purchase price' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TitledNumber value={totalValue} title='Total Offerings outstanding - current market price'/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Balance title='Makers' values={this.case.maker} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Balance title='Backers' values={this.case.backer} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Balance title='System' values={this.case.provision} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Balance title='Operator' values={this.case.operator} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <NextExits />
          </Grid>
        </Grid>
      </Paper>
    );
  }

};
export default withStyles(styles)(Dashboard);
