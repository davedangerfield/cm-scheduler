import { Component, Input, OnInit } from '@angular/core';

import { Card } from '../shared/model';
import { Day, weekDays, Form, allForms } from '../shared/enums';
import { FormDataService } from '../shared/form-data.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {

  private cards: Card[];
  private selectedDay: Day;
  private forms: Form[] = allForms;
  private days: Day[] = weekDays;
  
  constructor(private formDataService: FormDataService) { 
  }

  ngOnInit() {
    this.selectedDay = this.days[0];
    this.cards = this.formDataService.cards;
  }
  
  dayName(day: Day) {
    return Day[day];
  }

  formName(form: Form) {
    return Form[form];
  }

  onChangeDay(selection) {
    this.selectedDay = selection;
  }

  selectedDayFilter(form) {
    // TODO: check against this.selectedDay
    return this.cards.filter(card => (card.daysPerWeek == 3) && (card.formLevel == form));
  }

  changeToDayView(ev) {
    console.log(ev.target.textContent);
  }
}
