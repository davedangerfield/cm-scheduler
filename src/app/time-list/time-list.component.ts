import { Component, Input, OnInit } from '@angular/core';

import { Card } from '../shared/model';
import { Day } from '../shared/enums';
import { ConflictsService } from '../shared/conflicts.service';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.scss']
})
export class TimeListComponent implements OnInit {

@Input() cards: Card[];

constructor(
    private conflictsService: ConflictsService,
  ) { }

times: string[] = [
    '0:00',
    '0:10',
    '0:20',
    '0:30',
    '0:40',
    '0:50',
    '1:00',
    '1:10',
    '1:20',
    '1:30',
    '1:40',
    '1:50',
    '2:00',
    '2:10',
    '2:20',
    '2:30',
    '2:40',
    '2:50',
    '3:00',
    '3:10',
    '3:20',
    '3:30',
    '3:40',
    '3:50',
    '4:00',
  ];

  timeData: Object[];

  ngOnInit () {
    this.timeData = this.times.map((time, i) => {
      
      var windowMin = i * 10;
      var windowMax = (i * 10) + 9;
      var involvement = 
        !this.cards ? 
          undefined : 
          this.conflictsService.computeInvolvement(Day.Monday, windowMin, windowMax, this.cards);
      return {
        time,
        windowMin,
        windowMax,
        involvement,
      };
    });
  }

}
