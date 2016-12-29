import { Injectable } from '@angular/core';

import { Card } from './model';
import { ActivityType, activityTypeFromSymbol, Day, weekDays, Form, Involvement } from './enums';
import { formI, formICustom, formIIA, formIIACustom, formIII, formIIICustom } from './data';

@Injectable()
export class FormDataService {

  public cards: Card[] = [];

  constructor() { 
    this.init();
  }
  
  init() {

    var original = {formI, formICustom, formIIA, formIIACustom, formIII, formIIICustom};
    
    var formICards = original.formI.map(toCard(Form.I))
    var formICustomCards = original.formICustom.map(toCard(Form.I));
    
    var formIIACards = original.formIIA.map(toCard(Form.IIA));
    var formIIACustomCards = original.formIIACustom.map(toCard(Form.IIA));
    
    var formIIICards = original.formIII.map(toCard(Form.III));
    var formIIICustomCards = original.formIIICustom.map(toCard(Form.III));
    
    var initialCards = [].concat(formICards, formICustomCards, formIIACards, formIIACustomCards, formIIICards, formIIICustomCards);

    var numberOfSingleDayCoursesAssigned = 0;
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
      else if (card.daysPerWeek == 1) {
        // Assign single day classes in round robin strategy
        cardsToAdd.push(buildCard(card, weekDays[numberOfSingleDayCoursesAssigned % 5]));
        numberOfSingleDayCoursesAssigned++;
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
      title: item.title,
      daysPerWeek: Number(item.daysPerWeek),
      duration: Number(item.duration),
      teacherInvolvement: Number(item.teacherInvolvement) - 1,
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