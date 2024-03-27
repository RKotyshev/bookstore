import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subject, interval, last, take, takeUntil, tap } from 'rxjs';


@Component({
  selector: 'app-display-timer',
  templateUrl: './display-timer.component.html',
  styleUrl: './display-timer.component.scss',
  imports: [NgIf],
  standalone: true,
})
export class DisplayTimerComponent implements OnInit, OnDestroy {
  @Input()
  public timerDelay: number = 0;

  @Output()
  public timerFinished: EventEmitter<void> = new EventEmitter();
  
  private _destroyed = new Subject<void>;

  public ngOnInit(): void {
    interval(1000).pipe(
      take(this.timerDelay),
      tap(() => {
        this.timerDelay--;
      }),
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
