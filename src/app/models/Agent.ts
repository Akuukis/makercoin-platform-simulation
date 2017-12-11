import { computed, observable } from 'mobx';

import { PROGRESS, MATURITY, PROJECT_STATUS } from '../constants';
import { ConfigStore, TimeStore } from '../stores';
import { IAgent } from '../common/Agent';

export class Agent implements IAgent {
  @observable dollars: number = 0;
  @observable vouchers: number = 0;
  @observable natives: number = 0;

  reset() {
    this.dollars = 0;
    this.natives = 0;
    this.vouchers = 0;
  }
}
