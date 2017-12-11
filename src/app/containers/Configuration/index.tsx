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
import { ConfigStore } from '../../stores/ConfigStore';

import ProjectDist from './ProjectDist';
import IdoSize from './IdoSize';

export type ConfigurationClasses = 'root';
const styles: StyleRulesCallback<ConfigurationClasses> = (theme) => ({
  root: {
    padding: '0.5em',
  }
});

interface IConfigurationProps {
}

@inject(STORE.CONFIG)
@observer
class Configuration extends ComponentRouted<IConfigurationProps, ConfigurationClasses> {
  config: ConfigStore = this.props[STORE.CONFIG];

  @action.bound handleDefaultProb(event: React.ChangeEvent<HTMLInputElement>) {
    this.config.defaultProb = Number(event.currentTarget.value);
  }
  @action.bound handleSpawnRate(event: React.ChangeEvent<HTMLInputElement>) {
    this.config.spawnRate = Number(event.currentTarget.value);
  }
  @action.bound handleOperatingFee(event: React.ChangeEvent<HTMLInputElement>) {
    this.config.operatingFee = Number(event.currentTarget.value);
  }
  @action.bound handleExchangeFee(event: React.ChangeEvent<HTMLInputElement>) {
    this.config.exchangeFee = Number(event.currentTarget.value);
  }
  @action.bound handleRepurchaseFee(event: React.ChangeEvent<HTMLInputElement>) {
    this.config.repurchaseFee = Number(event.currentTarget.value);
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
          label={`${label}`}
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
          label={`${label} (percent)`}
          value={value}
          onChange={onChange}
      />
    );
  }

  render() {
    return (
      <Grid container spacing={16} className={this.props.classes.root}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Typography align='center' type='headline'>Global constants</Typography>
            <Grid container spacing={0} className={this.props.classes.root}>
              <Grid item xs={12}>
                {this.renderValueInput(  'spawnRate'    , this.config.spawnRate    , this.handleSpawnRate    )}
              </Grid>
              <Grid item xs={12}>
                {this.renderPercentInput('Default Probability (per week)', this.config.defaultProb, this.handleDefaultProb)}
              </Grid>
              <Grid item xs={12}>
                {this.renderPercentInput('operatingFee' , this.config.operatingFee , this.handleOperatingFee )}
              </Grid>
              <Grid item xs={12}>
                {this.renderPercentInput('exchangeFee'  , this.config.exchangeFee  , this.handleExchangeFee  )}
              </Grid>
              <Grid item xs={12}>
                {this.renderPercentInput('repurchaseFee', this.config.repurchaseFee, this.handleRepurchaseFee)}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Typography align='center' type='headline'>ICO Size</Typography>
            <Grid container spacing={0} className={this.props.classes.root}>
              {this.config.idoSizeDist.map((ido)=>(
                <Grid item xs={12} key={ido.value}>
                  <IdoSize ido={ido} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography align='center' type='headline'>New Project distribution</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell key={'first'}>{''}</TableCell>
                  {Object.keys(PROGRESS).map((progress)=>(
                      <TableCell key={progress}>{progress}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Object.keys(MATURITY).map((maturity: keyof typeof MATURITY)=>(
                    <TableRow key={maturity}>
                      <TableCell key={'first'}>{maturity}</TableCell>
                      {Object.keys(PROGRESS).map((progress: keyof typeof PROGRESS)=>(
                            <TableCell key={progress}>
                              <ProjectDist maturity={MATURITY[maturity]} progress={PROGRESS[progress]} />
                            </TableCell>
                        ))}
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid> 
    );
  }

};
export default withStyles(styles)(Configuration);
