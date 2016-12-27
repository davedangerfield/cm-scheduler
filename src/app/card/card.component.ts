import { 
  Component,
  Input, 
  OnInit } from '@angular/core';

import { 
  ActivityType,
  Form } from '../shared/enums';
import { Card } from '../shared/model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardData: Card;

  constructor() { }

  ngOnInit() {
  }

  height() {
    return this.cardData.duration * 5;
  }

  backgroundColor() {
    var backgroundColorMap = {
      [Form.I]: 'red',
      [Form.IIA]: 'yellow',
      [Form.III]: 'blue',
    }
    return backgroundColorMap[this.cardData.formLevel];
  }

  activityTypeSymbol() {
    var activityTypeSymbolMap = {
      [ActivityType.AT]:'@', 
      [ActivityType.BLANK]:'',
      [ActivityType.MINUS]:'-',
      [ActivityType.PLUS]:'+'
    };
    return activityTypeSymbolMap[this.cardData.activityType];
  }
}
