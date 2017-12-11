import { Observable, Subject, Subscription } from 'rxjs';
import { action, computed, observable } from 'mobx';
import { Project } from '../models/Project';
import { ConfigStore, TimeStore } from './index';
import { MATURITY, PROGRESS } from '../constants/index';
import * as Chance from 'chance';
import { IValueDistribution } from './ConfigStore';
// import Chance = require('chance');

import {Backer} from '../models/Backer';
import {Maker} from '../models/Maker';
import {Operator} from '../models/Operator';
import {Provision} from '../models/Provision';
import { IAgent } from '../common/Agent';

interface CaseEvent {
  name: string;
  event: string;
  details: string;
}

export class CaseStore {
  @observable.shallow public projects: Project[];
  public backer: Backer = new Backer();
  public maker: Maker = new Maker();
  public operator: Operator = new Operator();
  public provision: Provision = new Provision();

  public log: any[];

  private _random: Chance.Chance;
  public get random() { return this._random; }

  constructor(
    private time: TimeStore,
    private config: ConfigStore,
  ) {
    this.reset();

    time.reset$.subscribe(()=>this.reset());
    time.tick$.subscribe((tick)=>this.next());

  }

  private weighted<T extends IValueDistribution>(values: T[]): T {
    return chance.weighted(values, values.map((v)=>v.weight));
  }

  private reset() {
    this._random = new Chance(/*"foobar"*/);
    this.projects = [];
    this.backer.reset();
    this.maker.reset();
    this.operator.reset();
    this.provision.reset();
    this.log = [];
  }

  private next() {
    // Spawn new projects.
    for(let i=0; i<this.config.spawnRate; i++) {
      this.spawnProject();
    }

    // Check for defaults.
    this.projects
      .filter((project)=>project.maturityTick >= this.time.tick)
      .filter(()=>chance.bool({likelihood: this.config.defaultProb * 100}))
      .forEach(this.poisonProject, this)

    // Check for maturity.
    this.projects
      .filter((project)=>project.maturityTick === this.time.tick)
      .forEach(this.matureProject, this);
    
  }

  @action private spawnProject() {
    const name = this.random.name().split(' ')[0];
    this.log.push({name, event: 'spawn'})
    const characteristics = this.weighted(this.config.projectDist);
    const discount = characteristics.value;
    const maturity = characteristics.maturity;
    const progress = characteristics.progress;
    const size = this.weighted(this.config.idoSizeDist).value;

    const transfer = (from: IAgent, to: IAgent, what: keyof IAgent, amount: number) => {
      from[what] -= amount;
      to[what] += amount;
    }

    const project = new Project(this.config, this.time, name, discount, maturity, progress, size);
    transfer(this.backer   , this.provision, 'dollars' , project.size);
    transfer(this.provision, this.backer   , 'natives' , project.size);

    transfer(this.backer   , this.maker    , 'natives' , project.purchasePrice);
    transfer(this.maker    , this.backer   , 'vouchers', project.size);

    transfer(this.maker    , this.provision, 'natives' , project.purchasePrice);
    transfer(this.provision, this.maker    , 'dollars' , project.purchasePrice * (1 - this.config.operatingFee));
    transfer(this.provision, this.operator , 'dollars' , project.purchasePrice * this.config.operatingFee);

    this.projects.unshift(project);
  }

  @action private poisonProject(project: Project) {
    this.log.push({name: project.name, event: 'poison'})
    project.poisoned = true;
  }

  @action private matureProject(project: Project) {
    this.log.push({name: project.name, event: 'mature'})
    if(!project.poisoned) {
      // Project Exit


    } else {
      // Project Defaults

    }
  }

}