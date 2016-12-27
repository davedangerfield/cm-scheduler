import { 
  Component,
  Input, 
  OnInit } from '@angular/core';

import { 
  ActivityType,
  Form } from '../shared/enums/';
import { Card } from '../shared/model/';

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

  backgroundColor(card: Card) {
    var backgroundColorMap = {
      [Form.I]: 'red',
      [Form.IIA]: 'yellow',
      [Form.III]: 'blue',
    }
    return backgroundColorMap[card.formLevel];
  }

  activityTypeSymbol(activityType: ActivityType) {
    var activityTypeSymbolMap = {
      [ActivityType.AT]:'@', 
      [ActivityType.BLANK]:'',
      [ActivityType.MINUS]:'-',
      [ActivityType.PLUS]:'+'
    };
    return activityTypeSymbolMap[activityType];
  }
}
