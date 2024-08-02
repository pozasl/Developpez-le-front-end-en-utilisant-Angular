import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/**
 * Olympic App root component
 */
export class AppComponent implements OnInit {
  title: string = 'olympic-games-starter';
  ready: boolean = false;
  error: boolean = false;
  message: string = "loading";
  constructor(private olympicService: OlympicService) { }


  ngOnInit(): void {
    // We take the 1st mutation for subscription. unsubscribe isn't needed.
    this.olympicService.loadInitialData().pipe(take(1)).subscribe({
      next: () => {
        console.info("Olympic data loaded");
        this.ready = true;
      },
      error: (e: Error) => {
        console.error(e.message)
        this.message = e.message
        this.error = true;
      },
    });
  }

}
