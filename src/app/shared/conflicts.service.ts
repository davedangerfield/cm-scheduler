import { Injectable } from '@angular/core';

import { Card } from './model';
import { Day, weekDays, Form } from './enums';

@Injectable()
export class ConflictsService {

  constructor() { }

  compute(cards: Card[]): string[] {

    var conflicts = [];
    
    var monday = cards.filter(card => card.day == Day.Monday);

    var formI = monday.filter(card => card.formLevel == Form.I);
    var formIIA = monday.filter(card => card.formLevel == Form.IIA);
    var formIII = monday.filter(card => card.formLevel == Form.III);

    //Monday
    // var monday = cards.filter(card => card.day == Day.Monday);

    // var formI = monday.filter(card => card.formLevel == Form.I);
    // var formIIA = monday.filter(card => card.formLevel == Form.IIA);
    // var formIII = monday.filter(card => card.formLevel == Form.III);

    // var newFormI = [], newFormIIA = [], newFormIII = [];

    // formI.forEach(card => {
    //   for (var i = 0; i < (card.duration / 5); i++) {
    //     newFormI.push(card);
    //   }
    // });

    // formIIA.forEach(card => {
    //   for (var i = 0; i < (card.duration / 5); i++) {
    //     newFormIIA.push(card);
    //   }
    // });

    // formIII.forEach(card => {
    //   for (var i = 0; i < (card.duration / 5); i++) {
    //     newFormIII.push(card);
    //   }
    // });

    // for (var i = 0; i < 48; i++) { //48 = number of 5 minute periods in a day (4*12)
    //   var bookedAmt = newFormI[i].teacherInvolvement + newFormIIA[i].teacherInvolvement + newFormIII[i].teacherInvolvement;
    //   console.log(`At minute ${i}, you are booked ${bookedAmt}`);
    // }

    // console.log(newFormI);

    // Compute activity type conflicts per day for contiguous activities
    // weekDays.forEach(weekDay => {
    //   conflicts.push(`${Day[weekDay]}`);

    //   var dayCards = cards.filter(card => card.day == weekDay);
    //   dayCards.forEach((card, index) => {

    //     if (index == 0) return;
    //     var priorCard = dayCards[index-1];
    //     if (card.activityType == priorCard.activityType) {
    //       conflicts.push(`${priorCard.title} and ${card.title} are of the same activity type`);
    //     }
    //   });
    // });

    return conflicts;

  }

  computeInvolvement (day: Day, windowMin, windowMax, cards: Card[]): number {
    var intersectingCourses = getIntersectingCourses(day, windowMin, windowMax, cards);
    
    return intersectingCourses.reduce(function toTotalInvolvement (totalInvolvement, card) {
      return totalInvolvement + card.teacherInvolvement;
    }, 0);
  }

  showInvolvementConflicts (day: Day, windowMin, windowMax, cards: Card[]): string[] {
    // Compute teacher overbooked conflicts per day across all forms
    var conflicts = [];
    
    var intersectingCourses = getIntersectingCourses(day, windowMin, windowMax, cards);
    
    intersectingCourses.forEach(card => conflicts.push(JSON.stringify(card, null, 2)));
    return conflicts;
  }
}

function getIntersectingCourses(day: Day, windowMin, windowMax, cards: Card[]): Card[] {
      var dayCards = cards.filter(card => card.day == day);

      var formICourses = dayCards
        .filter(card => card.formLevel == Form.I)
        .reduce(toIntersectingCourses(windowMin, windowMax), []);
      var formIIACourses = dayCards
        .filter(card => card.formLevel == Form.IIA)
        .reduce(toIntersectingCourses(windowMin, windowMax), []);
      var formIIICourses = dayCards
        .filter(card => card.formLevel == Form.III)
        .reduce(toIntersectingCourses(windowMin, windowMax), []);
      
      return [...formICourses, ...formIIACourses, ...formIIICourses];


      function toIntersectingCourses (windowMin, windowMax) {
        
        var iterationStartTime = 0;

        return function coursesOccuringByMaxTime (cardsInWindow, card) {
          var cardStart = iterationStartTime;
          var cardEnd = cardStart + card.duration;

          iterationStartTime += card.duration; // set for next iteration

          if (cardEnd < windowMin || cardStart >= windowMax) {
            // It's not in the window
            return cardsInWindow;
          }
          // It's in the window
          return cardsInWindow.concat(card);
        }
      }
    }

