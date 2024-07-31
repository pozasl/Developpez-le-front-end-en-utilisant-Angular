import { Component, Input } from '@angular/core';
import { AppNotification } from 'src/app/core/models/AppNotification';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-olympic-footer',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './olympic-footer.component.html',
  styleUrl: './olympic-footer.component.scss'
})
export class OlympicFooterComponent {
  @Input() showBackButton:boolean = false;
  @Input() notification?:AppNotification;
}