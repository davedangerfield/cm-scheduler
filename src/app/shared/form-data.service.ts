import { Injectable } from '@angular/core';

import { Card } from './model';
import { ActivityType, activityTypeFromSymbol, Day, weekDays, Form, allForms, Involvement } from './enums';
import { formI, formIIA, formIII } from './initial-data';
import { savedSchedule } from './cm-schedule';

const STORAGE_KEY: string = 'cm-schedule';

@Injectable()
export class FormDataService {

  private cards: Card[] = [];
  public newCards: {};

  constructor() { 
    this.init();
  }
  
  saveCards() {
    // Hammer all the days to be the correct value
    allForms.forEach(form => {
      var formName = Form[form];
      weekDays.forEach(day => {
        var dayName = Day[day]; 
        this.newCards[formName][dayName].forEach(card => card.day = day);
      })
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.newCards, null, 2));
  }

  init() { 
    var storedSchedule = localStorage.getItem(STORAGE_KEY);
    if (storedSchedule) {
      this.newCards = JSON.parse(storedSchedule);
      return;
    }
    
    if (savedSchedule) {
      this.newCards = savedSchedule;
      return;
    }

    this.newCards = buildInitialSchedule();
  }
  
}

function buildInitialSchedule() {
  var original = {formI, formIIA, formIII};
    
  var formICards = original.formI.map(toCard(Form.I))
  var formIIACards = original.formIIA.map(toCard(Form.IIA));
  var formIIICards = original.formIII.map(toCard(Form.III));
  
  var initialCards = [].concat(formICards, formIIACards, formIIICards);

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

  return newFormat(this.cards);
}

function newFormat(cards: Card[]) {
  var newCards = {};

  allForms.forEach(form => {
    newCards[Form[form]] = {};
    weekDays.forEach(weekDay => {
      newCards[Form[form]][Day[weekDay]] = cards.filter(card => card.formLevel == form && card.day == weekDay);
    });
  });
  
  return newCards;
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