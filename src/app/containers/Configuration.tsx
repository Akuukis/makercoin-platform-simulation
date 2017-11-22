import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import {ComponentRouted} from '../common/';

export type ConfigurationClasses = 'root';
const styles: StyleRulesCallback<ConfigurationClasses> = (theme) => ({
  root: {
  }
});

interface IConfigurationProps {
}

@inject()
@observer
class Configuration extends ComponentRouted<IConfigurationProps, ConfigurationClasses> {

  render() {
    return (
      <Grid container className={this.props.classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography type={'title'}>
            Hello world
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          Configuration
        </Grid>
      </Grid>
    );
  }

};
export default withStyles(styles)(Configuration);
