import { Component, Input, OnInit } from '@angular/core';

import { Card } from '../shared/model';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit {

  @Input() cards: Array<Card>;

  constructor() { }

  ngOnInit() {
  }

}
