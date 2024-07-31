import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppNotification } from 'src/app/core/models/AppNotification';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-olympic-footer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './olympic-footer.component.html',
  styleUrl: './olympic-footer.component.scss'
})
export class OlympicFooterComponent {
  @Input() showBackButton:boolean = false;
  notification$:Observable<AppNotification | null> = of(null)
}
