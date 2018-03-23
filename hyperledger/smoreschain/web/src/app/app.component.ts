import { Component, OnInit } from '@angular/core';
import { CampfireDataService } from './campfireData.service';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public cdService: CampfireDataService
  ) {
  }

  ngOnInit(): void {
    this.cdService.loadData();
  }
}
