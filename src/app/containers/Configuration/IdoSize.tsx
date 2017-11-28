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
import { ConfigStore, IIdoSize } from '../../stores/ConfigStore';

export type IdoSizeClasses = 'root';
const styles: StyleRulesCallback<IdoSizeClasses> = (theme) => ({
  root: {
  }
});

interface IIdoSizeProps {
  ido: IIdoSize;
}

@inject(STORE.CONFIG)
@observer
class IdoSize extends ComponentRouted<IIdoSizeProps, IdoSizeClasses> {
  config: ConfigStore = this.props[STORE.CONFIG];

  @action.bound handleWeight(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.ido.weight = Number(event.currentTarget.value);
  }

  @action.bound handleValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.ido.value = Number(event.currentTarget.value);
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
        <Grid item xs={12} sm={6}>
          {this.renderPercentInput('Size', this.props.ido.value, this.handleValue)}
        </Grid>
        <Grid item xs={12} sm={6}>
          {this.renderValueInput('Weight', this.props.ido.weight, this.handleWeight)}
        </Grid>
      </Grid> 
    );
  }

};
export default withStyles(styles)(IdoSize);
