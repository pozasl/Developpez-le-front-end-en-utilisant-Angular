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
  constructor(private olympicService: OlympicService) { }


  ngOnInit(): void {
    const sub = this.olympicService.loadInitialData().pipe(take(1)).subscribe({
      next: (olps) => {
        console.info("Olympic data loaded");
      },
      error: (e) => console.error(e),
    });
  }

}
