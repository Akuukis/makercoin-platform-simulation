import { computed, observable } from 'mobx';

import { PROGRESS, MATURITY, PROJECT_STATUS } from '../constants';
import { ConfigStore, TimeStore } from '../stores';

export class Project {
  readonly birthTick: number;
  readonly maturityTick: number;
  readonly length: number;

  @observable public poisoned = false;  // == hidden default.

  constructor(
    private config: ConfigStore,
    private time: TimeStore,
    public readonly name: string,
    public readonly discount: number,
    public readonly maturity: MATURITY,
    public readonly progress: PROGRESS,
    public readonly size: number,
  ) {
    this.birthTick = this.time.tick;
    this.length = this.config.maturities[maturity];
    this.maturityTick = this.time.tick + this.length;
  }

  @computed get matured() { return Math.min(1, (this.time.tick - this.birthTick) / this.length ); }
  @computed get value() { return this.size * (1 - this.discount) + this.size * this.discount * this.matured; }

  @computed get status(): PROJECT_STATUS {
    if(this.matured < 1) return PROJECT_STATUS.ONGOING;
    if(this.poisoned) return PROJECT_STATUS.DEFAULTED;
    return PROJECT_STATUS.EXITED;
  }

}
