import { Component, Input, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-olympic-pie',
  standalone: true,
  imports: [],
  templateUrl: './olympic-pie.component.html',
  styleUrl: './olympic-pie.component.scss'
})
export class OlympicPieComponent {
  @Input() olympics: Olympic[] | null = [];
  
}
