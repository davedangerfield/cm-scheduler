import { Component, Input } from '@angular/core';

import { ActivityType, Form } from '../shared/enums';
import { Card } from '../shared/model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() cardData: Card;

  height() {
    const HEIGHT_PIXELS_PER_MINUTE = 5;
    return this.cardData.duration * HEIGHT_PIXELS_PER_MINUTE;
  }

  backgroundColor() {
    var backgroundColorMap = {
      [Form.I]: '#05fc70',
      [Form.IIA]: '#5ed9ff',
      [Form.III]: '#fcd305',
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

  formName(form: Form) {
    return Form[form];
  }
}
