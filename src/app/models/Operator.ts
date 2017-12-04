import { computed, observable } from 'mobx';

import { PROGRESS, MATURITY, PROJECT_STATUS } from '../constants';
import { ConfigStore, TimeStore } from '../stores';

export class Operator {
  dollars: number;
  vouchers: number;
  natives: number;
}
