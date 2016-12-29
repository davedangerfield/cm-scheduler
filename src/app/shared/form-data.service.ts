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
    // Fix formIIA first because it has a 'parent' instead of a 'parentInvolvement'
    formIIA.forEach((item: any) => {
      item.parentInvolvement = item.parent; 
      delete item.parent;
    });

    var originalData = {formI, formIIA, formIII};
    
    var formICards = originalData.formI.map(toCard(Form.I));
    var formIIACards = originalData.formIIA.map(toCard(Form.IIA));
    var formIIICards = originalData.formIII.map(toCard(Form.III));
    
    var initialCards = [].concat(formICards, formIIACards, formIIICards);

    this.cards = initialCards.reduce((accumulatedCards, card: Card) => {
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

      return accumulatedCards.concat(cardsToAdd);
    }, []);
  }
}

function toCard (form: Form) {
  return function (item): Card {
    return <Card>{
      activityType: activityTypeFromSymbol(item.symbol),
      formLevel: form,
      title: item.text,
      daysPerWeek: Number(item.reps),
      duration: Number(item.time),
      teacherInvolvement: Number(item.parentInvolvement) - 1,
    };
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
    day,
  };
}