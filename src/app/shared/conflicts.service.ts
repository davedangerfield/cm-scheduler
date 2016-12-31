import { Injectable } from '@angular/core';

import { Card } from './model';
import { ActivityType, Day, weekDays, Form, allForms } from './enums';
import { FormDataService } from './form-data.service';

@Injectable()
export class ConflictsService {

  constructor(private formDataService: FormDataService) { }

  computeActivityTypeConflicts(): string[] {

    var conflicts = [];
    var cards = this.formDataService.newCards;

    // Compute activity type conflicts per day for contiguous activities
    allForms.forEach(form => {
      var formName = Form[form];
      weekDays.forEach(day => {
        var dayName = Day[day];

        this.formDataService.newCards[formName][dayName].forEach((card, index, array) => {
          if (index == 0) return;
          var priorCard = array[index-1];
          if (card.activityType != ActivityType.BLANK && 
              card.activityType == priorCard.activityType) {
            
            conflicts.push(`${formName}-${dayName}: ${priorCard.title} and ${card.title} are of the same activity type`);
            card.conflict = priorCard.conflict = true;
            return;
          }
          card.conflict = false;
        });
      });
    });
    
    // var monday = cards.filter(card => card.day == Day.Monday);

    // var formI = monday.filter(card => card.formLevel == Form.I);
    // var formIIA = monday.filter(card => card.formLevel == Form.IIA);
    // var formIII = monday.filter(card => card.formLevel == Form.III);

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

      var formICourses = cards[Form[Form.I]][Day[day]] || cards[Form[Form.I]] 
        .reduce(toIntersectingCourses(windowMin, windowMax), []);
      var formIIACourses = cards[Form[Form.IIA]][Day[day]] || cards[Form[Form.I]]
        .filter(card => card.formLevel == Form.IIA)
        .reduce(toIntersectingCourses(windowMin, windowMax), []);
      var formIIICourses = cards[Form[Form.III]][Day[day]] || cards[Form[Form.I]]
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

