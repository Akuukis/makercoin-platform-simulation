import { Observable, Subject, Subscription } from 'rxjs';
import { action, computed, observable } from 'mobx';
import { Project } from '../models/Project';
import { ConfigStore, TimeStore } from './index';
import { MATURITY, PROGRESS } from '../constants/index';
import * as Chance from 'chance';
import { IValueDistribution } from './ConfigStore';
// import Chance = require('chance');

interface CaseEvent {
  name: string;
  event: string;
  details: string;
}

export class CaseStore {
  @observable.shallow public projects: Project[];
  public platform: any;
  public backer: any;
  public log: any;

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
    this.platform = null;
    this.backer = null;
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
    const project = this.weighted(this.config.projectDist);
    const discount = project.value;
    const maturity = project.maturity;
    const progress = project.progress;
    const size = this.weighted(this.config.idoSizeDist).value;
    this.projects.push(new Project(this.config, this.time, name, discount, maturity, progress, size));
  }

  @action private poisonProject(project: Project) {
    this.log.push({name: project.name, event: 'poison'})
    project.poisoned = true;
  }

  @action private matureProject(project: Project) {
    this.log.push({name: project.name, event: 'mature'})
  }

}