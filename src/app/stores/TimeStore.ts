import { Observable, Subject, Subscription } from 'rxjs';
import { action, computed, observable } from 'mobx';

export class TimeStore {
  private on: boolean = false;

  @observable private _tick: number = 0;
  @computed public get tick() { return this._tick; }

  private _resetSubject: Subject<void> = new Subject();
  public get reset$() { return this._resetSubject.asObservable(); }

  private subscription: Subscription;
  private _timerSubject: Subject<Observable<number>> = new Subject();
  private _stepperSubject: Subject<void> = new Subject();
  private _tick$: Observable<number> 
  public get tick$() { return this._tick$; }


  constructor() {
    const _tick$ = Observable.merge(
        this._timerSubject.asObservable().switch(),
        this._stepperSubject.asObservable(),
      )
      .do(action(()=>console.log(this._tick) || this._tick++))
      .map(()=>this.tick)
      .publish();
    this.stop();
    this.subscription = _tick$.connect();
    this._tick$ = _tick$;
  }

  @action public start(interval: number = 1) {
    this.on = true;
    this._timerSubject.next( Observable.interval(interval * 1000) );
  }

  @action public stop() {
    this.on = false;
    this._timerSubject.next( Observable.never() );
  }

  public step(count: number = 1) {
    for(let i=0; i<count; i++) this._stepperSubject.next();
  }

  @action public reset() {
    this._tick = 0;
    this._resetSubject.next(undefined);
  }

}
