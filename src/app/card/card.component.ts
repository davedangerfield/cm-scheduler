import { 
  Component,
  Input, 
  OnInit } from '@angular/core';

import { ActivityType } from '../shared/enums/';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardData: {};

  constructor() { }

  ngOnInit() {
  }

  activityTypeSymbol(activityType: ActivityType) {
    if (activityType === ActivityType.AT) {
      return '@';
    }
    if (activityType === ActivityType.BLANK) {
      return '';
    }
    if (activityType === ActivityType.MINUS) {
      return '-';
    }
    if (activityType === ActivityType.PLUS) {
      return '+';
    }
  }
}
