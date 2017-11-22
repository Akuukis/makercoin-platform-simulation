import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import {ComponentRouted} from '../common/';

export type HomeClasses = 'root';
const styles: StyleRulesCallback<HomeClasses> = (theme) => ({
  root: {
  }
});

interface IHomeProps {
}

@inject()
@observer
class Home extends ComponentRouted<IHomeProps, HomeClasses> {

  render() {
    return (
      <Grid container className={this.props.classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography type={'title'}>
            Hello world
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          Home
        </Grid>
      </Grid>
    );
  }

};
export default withStyles(styles)(Home);
