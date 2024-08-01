import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-olympic-header',
  standalone: true,
  imports: [],
  templateUrl: './olympic-header.component.html',
  styleUrl: './olympic-header.component.scss'
})
export class OlympicHeaderComponent {
  @Input() title:string = "";
}
