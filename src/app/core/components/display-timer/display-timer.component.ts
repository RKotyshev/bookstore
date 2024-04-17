import { NgIf, AsyncPipe } from '@angular/common';
import { 
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
  
import { 
  Observable,
  Subject,
  last,
  map,
  share,
  take,
  takeUntil,
  timer,
} from 'rxjs';


@Component({
  selector: 'app-display-timer',
  templateUrl: './display-timer.component.html',
  styleUrl: './display-timer.component.scss',
  imports: [NgIf, AsyncPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayTimerComponent implements OnInit, OnDestroy {
  @Input()
  public timerDelay: number = 0;

  @Output()
  public timerFinished: EventEmitter<void> = new EventEmitter();
  
  public timeLeft$!: Observable<number>;
  private _destroyed = new Subject<void>;

  public ngOnInit(): void {
    this.timeLeft$ = timer(0, 1000).pipe(
      take(this.timerDelay),
      map(() => --this.timerDelay),
      share(),
    );

    this.timeLeft$.pipe(
      last(),
      takeUntil(this._destroyed),
    ).subscribe(() => {
      this.timerFinished.emit();
    });

  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
