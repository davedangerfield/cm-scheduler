import { Component, Input, OnInit } from '@angular/core';

import { Card } from '../shared/model';
import { Day, weekDays, Form, allForms } from '../shared/enums';
import { FormDataService } from '../shared/form-data.service';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit {

  private cards: Card[];
  private selectedForm: Form;
  private forms: Form[] = allForms;
  private days: Day[] = weekDays;
  
  constructor(private formDataService: FormDataService) { 
    this.formDataService = formDataService;
  }

  ngOnInit() {
    this.selectedForm = this.forms[0];
    this.cards = this.formDataService.cards;
  }

  dayName(day: Day) {
    return Day[day];
  }

  formName(form: Form) {
    return Form[form];
  }

  onChangeForm(selection) {
    this.selectedForm = selection;
  }

  selectedFormFilter() {
    return this.cards.filter(card => card.formLevel == this.selectedForm);
  }

  changeToFormView(ev) {
    console.log(ev.target.textContent);
  }
}
