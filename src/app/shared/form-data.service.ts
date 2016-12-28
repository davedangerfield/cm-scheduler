import { Injectable } from '@angular/core';

import { Card } from './model';
import { ActivityType, activityTypeFromSymbol, Form, Involvement } from './enums';
import { formI, formIIA, formIII } from './data';

@Injectable()
export class FormDataService {

  public cards: Card[] = [];

  constructor() { 
    this.init();
  }

  init() {
    var formICards = formI.map(item => (<Card> {
      activityType: activityTypeFromSymbol(item.symbol),
      formLevel: Form.I,
      title: item.text,
      daysPerWeek: item.reps,
      duration: item.time,
      teacherInvolvement: item.parentInvolvement,
    }));
    
    var formIIACards = formIIA.map(item => (<Card> {
      activityType: activityTypeFromSymbol(item.symbol),
      formLevel: Form.IIA,
      title: item.text,
      daysPerWeek: Number(item.reps),
      duration: Number(item.time),
      teacherInvolvement: Number(item.parent),
    }));
    
    var formIIICards = formIII.map(item => (<Card> {
      activityType: activityTypeFromSymbol(item.symbol),
      formLevel: Form.III,
      title: item.text,
      daysPerWeek: item.reps,
      duration: item.time,
      teacherInvolvement: item.parentInvolvement,
    }));

    this.cards = [].concat(formICards, formIIACards, formIIICards);
  }
}
