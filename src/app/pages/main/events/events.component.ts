import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  public eventDate = '2024-01-01T00:00:00.000Z';
}
