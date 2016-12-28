import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.scss']
})
export class TimeListComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
