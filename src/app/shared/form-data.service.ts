import { Injectable } from '@angular/core';

import { Card } from './model';
import { ActivityType, activityTypeFromSymbol, Day, weekDays, Form, Involvement } from './enums';
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

    this.cards = initialCards.reduce((acc, card: Card) => {
      var cardsToAdd: Card[] = [];
      
      if (card.daysPerWeek == 3) {
        cardsToAdd.push(buildCard(card, Day.Monday));
        cardsToAdd.push(buildCard(card, Day.Wednesday));
        cardsToAdd.push(buildCard(card, Day.Friday));
      }
      else if (card.daysPerWeek == 2) {
        cardsToAdd.push(buildCard(card, Day.Tuesday));
        cardsToAdd.push(buildCard(card, Day.Thursday));
      }
      else {
        for (var i = 0; i < card.daysPerWeek; i++) {
          cardsToAdd.push(buildCard(card, weekDays[i]));
        }
      }

      return acc.concat(cardsToAdd);
    }, []);
  }
}

function buildCard(template: Card, day: Day): Card {
  return {
    activityType: template.activityType,
    formLevel: template.formLevel,
    title: template.title,
    daysPerWeek: template.daysPerWeek,
    duration: template.duration,
    teacherInvolvement: template.teacherInvolvement,
    day: day
  };
}