import { Component } from '@angular/core';

import { Card } from './shared/model/';
import { ActivityType, Form, Involvement } from './shared/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  cardData: Card = {
    activityType: ActivityType.AT,
    formLevel: Form.I,
    title: 'Copywork',
    daysPerWeek: 5,
    duration: 10,
    teacherInvolvement: Involvement.CRESENT
  };
}
