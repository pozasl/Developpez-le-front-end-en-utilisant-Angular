import { Component, Input } from '@angular/core';
import { CounterBoxData } from 'src/app/core/models/CounterBoxData';

@Component({
  selector: 'app-olympic-counter-box',
  standalone: true,
  imports: [],
  templateUrl: './olympic-counter-box.component.html',
  styleUrl: './olympic-counter-box.component.scss'
})
export class OlympicCounterBoxComponent {
  @Input() boxData?:CounterBoxData;

}
