import { Injectable } from '@angular/core';

import { Card } from './model';
import { ActivityType, activityTypeFromSymbol, weekDays, Form, Involvement } from './enums';
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
    var initialCards = [].concat(formICards, formIIACards, formIIICards);

    this.cards = initialCards.reduce((acc, card) => {
      var cardsToAdd: Card[] = [];
      
      for (var i = 0; i < card.daysPerWeek; i++) {
        cardsToAdd.push(<Card>{
          activityType: card.activityType,
          formLevel: card.formLevel,
          title: card.title,
          daysPerWeek: card.daysPerWeek,
          duration: card.duration,
          teacherInvolvement: card.teacherInvolvement,
          day: weekDays[i]
        });
      }
      return acc.concat(cardsToAdd);
    }, []);
  }
}
