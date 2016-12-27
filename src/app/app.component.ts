import { Component } from '@angular/core';

import { Card } from './shared/model';
import { ActivityType, Form, Involvement } from './shared/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  cards: Array<Card> = [
    {
      activityType: ActivityType.AT,
      formLevel: Form.I,
      title: 'Copywork',
      daysPerWeek: 5,
      duration: 10,
      teacherInvolvement: Involvement.CRESENT
    },
    {
      activityType: ActivityType.MINUS,
      formLevel: Form.IIA,
      title: 'Blah',
      daysPerWeek: 3,
      duration: 40,
      teacherInvolvement: Involvement.FULL
    },
    {
      activityType: ActivityType.MINUS,
      formLevel: Form.III,
      title: 'Blah 2',
      daysPerWeek: 3,
      duration: 25,
      teacherInvolvement: Involvement.HALF
    },
    {
      activityType: ActivityType.PLUS,
      formLevel: Form.IIA,
      title: 'Blah',
      daysPerWeek: 4,
      duration: 20,
      teacherInvolvement: Involvement.FULL
    }
  ];
  
}
