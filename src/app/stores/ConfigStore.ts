import { PROGRESS, MATURITY } from "../constants/index";
import { observable } from "mobx";

export interface IValueDistribution {
  weight: number,
  value: number,
}

export interface IProjectDiscount extends IValueDistribution {
  progress: PROGRESS,
  maturity: MATURITY,
}

export interface IIdoSize extends IValueDistribution {
}

export class ConfigStore {
  @observable projectDist: IProjectDiscount[];
  @observable idoSizeDist: IIdoSize[];
  @observable maturities: Record<MATURITY, number>;
  @observable defaultProb: number;
  @observable spawnRate: number;
  @observable operatingFee: number;
  @observable exchangeFee: number;
  @observable repurchaseFee: number;

  constructor() {
    this.projectDist = [
      {progress: PROGRESS.DFMA     , maturity: MATURITY.week00, weight: 0, value: 0},
      {progress: PROGRESS.DFMA     , maturity: MATURITY.week10, weight: 4, value: 0.05},
      {progress: PROGRESS.DFMA     , maturity: MATURITY.week20, weight: 4, value: 0.10},
      {progress: PROGRESS.DFMA     , maturity: MATURITY.week30, weight: 4, value: 0.15},
      {progress: PROGRESS.DFMA     , maturity: MATURITY.week40, weight: 0, value: 0},
      {progress: PROGRESS.DFMA     , maturity: MATURITY.week50, weight: 0, value: 0},
      {progress: PROGRESS.PROTOTYPE, maturity: MATURITY.week00, weight: 0, value: 0},
      {progress: PROGRESS.PROTOTYPE, maturity: MATURITY.week10, weight: 3, value: 0.15},
      {progress: PROGRESS.PROTOTYPE, maturity: MATURITY.week20, weight: 3, value: 0.20},
      {progress: PROGRESS.PROTOTYPE, maturity: MATURITY.week30, weight: 3, value: 0.25},
      {progress: PROGRESS.PROTOTYPE, maturity: MATURITY.week40, weight: 3, value: 0.30},
      {progress: PROGRESS.PROTOTYPE, maturity: MATURITY.week50, weight: 0, value: 0},
      {progress: PROGRESS.DESIGN   , maturity: MATURITY.week00, weight: 0, value: 0},
      {progress: PROGRESS.DESIGN   , maturity: MATURITY.week10, weight: 0, value: 0},
      {progress: PROGRESS.DESIGN   , maturity: MATURITY.week20, weight: 3, value: 0.35},
      {progress: PROGRESS.DESIGN   , maturity: MATURITY.week30, weight: 3, value: 0.40},
      {progress: PROGRESS.DESIGN   , maturity: MATURITY.week40, weight: 3, value: 0.45},
      {progress: PROGRESS.DESIGN   , maturity: MATURITY.week50, weight: 3, value: 0.50},
      {progress: PROGRESS.IDEA     , maturity: MATURITY.week00, weight: 0, value: 0},
      {progress: PROGRESS.IDEA     , maturity: MATURITY.week10, weight: 0, value: 0},
      {progress: PROGRESS.IDEA     , maturity: MATURITY.week20, weight: 0, value: 0},
      {progress: PROGRESS.IDEA     , maturity: MATURITY.week30, weight: 4, value: 0.60},
      {progress: PROGRESS.IDEA     , maturity: MATURITY.week40, weight: 4, value: 0.65},
      {progress: PROGRESS.IDEA     , maturity: MATURITY.week50, weight: 4, value: 0.70},
    ]
    this.idoSizeDist = [
      {weight: 26, value:   50000},
      {weight: 13, value:  100000},
      {weight:  6, value:  200000},
      {weight:  2, value:  500000},
      {weight:  1, value: 1000000},
    ]
    this.maturities = {
      [MATURITY.week00]: 0,
      [MATURITY.week10]: 10,
      [MATURITY.week20]: 20,
      [MATURITY.week30]: 30,
      [MATURITY.week40]: 40,
      [MATURITY.week50]: 50,
    }
    this.defaultProb = 0.007;
    this.spawnRate = 1;
    this.operatingFee = 0.02;
    this.exchangeFee = 0.00;
    this.repurchaseFee = 0.00;
  }
}
