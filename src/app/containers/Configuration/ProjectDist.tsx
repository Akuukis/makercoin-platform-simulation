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

export type ProjectDistClasses = 'root';
const styles: StyleRulesCallback<ProjectDistClasses> = (theme) => ({
  root: {
  }
});

interface IProjectDistProps {
  maturity: MATURITY;
  progress: PROGRESS;
}

@inject(STORE.CONFIG)
@observer
class ProjectDist extends ComponentRouted<IProjectDistProps, ProjectDistClasses> {
  config: ConfigStore = this.props[STORE.CONFIG];

  @computed get projectDist() {
    return this.config.projectDist.find((projectDist)=>projectDist.maturity === this.props.maturity && projectDist.progress === this.props.progress)
  }

  @action.bound handleWeight(event: React.ChangeEvent<HTMLInputElement>) {
    this.projectDist.weight = Number(event.currentTarget.value);
  }

  @action.bound handleValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.projectDist.value = Number(event.currentTarget.value);
  }

  renderValueInput(label: string, value: number, onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void) {
    return (
        <TextField
          fullWidth
          type='number'
          InputLabelProps={{shrink: true}}
          inputProps={{
            min: 0,
            step: 1,
          }}
          margin='normal'
          id={label}
          label={label}
          value={value}
          onChange={onChange}
      />
    );
  }

  renderPercentInput(label: string, value: number, onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void) {
    return (
        <TextField
          fullWidth
          type='number'
          InputLabelProps={{shrink: true}}
          inputProps={{
            min: 0,
            max: 1,
            step: 0.01,
          }}
          margin='normal'
          id={label}
          label={label}
          value={value}
          onChange={onChange}
      />
    );
  }

  render() {
    return (
      <Grid container spacing={8} className={this.props.classes.root}>
        <Grid item xs={12} md={6}>
          {this.renderPercentInput('Discount', this.projectDist.value, this.handleValue)}
        </Grid>
        <Grid item xs={12} md={6}>
          {this.renderValueInput('Weight', this.projectDist.weight, this.handleWeight)}
        </Grid>
      </Grid> 
    );
  }

};
export default withStyles(styles)(ProjectDist);
