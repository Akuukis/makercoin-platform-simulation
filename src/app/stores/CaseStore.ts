import { Observable, Subject, Subscription } from 'rxjs';
import { action, computed, observable } from 'mobx';
import { Project } from '../models/Project';
import { ConfigStore, TimeStore } from './index';
import Prando from 'prando';
import { MATURITY, PROGRESS } from '../constants/index';
import * as Chance from 'chance';
import { IValueDistribution } from './ConfigStore';
// import Chance = require('chance');
const chance = Chance();
function weighted<T extends IValueDistribution>(values: T[]): T {
  return chance.weighted(values, values.map((v)=>v.weight));
}


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

  private _random: Prando;
  public get random() { return this._random; }

  constructor(
    private time: TimeStore,
    private config: ConfigStore,
  ) {
    this.reset();

    time.reset$.subscribe(()=>this.reset());
    time.tick$.subscribe((tick)=>this.next());

  }

  private reset() {
    this._random = new Prando();
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
      .filter(()=>this.random.next() < this.config.defaultProb)
      .forEach(this.poisonProject, this)

    // Check for maturity.
    this.projects
      .filter((project)=>project.maturityTick === this.time.tick)
      .forEach(this.matureProject, this);
    
  }

  @action private spawnProject() {
    const title = this.random.nextString(4);
    const project = weighted(this.config.projectDist);
    const discount = project.value;
    const maturity = project.maturity;
    const progress = project.progress;
    const size = weighted(this.config.idoSizeDist).value;
    this.projects.push(new Project(this.config, this.time, title, discount, maturity, progress, size));
  }

  @action private poisonProject(project: Project) {
    this.log.push({name: project.name, event: 'poison'})
    project.poisoned = true;
  }

  @action private matureProject(project: Project) {
    this.log.push({name: project.name, event: 'mature'})
  }

}