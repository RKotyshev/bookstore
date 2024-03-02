import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { interval, last, take, tap } from 'rxjs';


@Component({
  selector: 'app-display-with-timer',
  templateUrl: './display-with-timer.component.html',
  styleUrl: './display-with-timer.component.scss',
  imports: [NgIf],
  standalone: true,
})
export class DisplayWithTimerComponent implements OnInit {
  @Input() public timerDelay: number = 0;
  @Output() public timerDelayChange: EventEmitter<number> = new EventEmitter();
  @Output() public timerAlert: EventEmitter<void> = new EventEmitter();

  public ngOnInit(): void {
    interval(1000).pipe(
      take(this.timerDelay),
      tap(() => {
        this.timerDelay--;
        this.timerDelayChange.emit(this.timerDelay);
      }),
      last(),
    ).subscribe(() => {
      this.timerAlert.emit();
    });
  }
}
