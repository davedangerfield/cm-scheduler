import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Card } from '../shared/model';
import { Day, weekDays, Form, allForms } from '../shared/enums';
import { FormDataService } from '../shared/form-data.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {

  private cards: {};
  private selectedDay: Day;
  private forms: Form[] = allForms;
  private days: Day[] = weekDays;
  
  constructor(
    private formDataService: FormDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    var dayId = Number(this.route.snapshot.params['dayId']);
    this.selectedDay = dayId > -1 ? this.days[dayId] : this.days[0];
    this.cards = this.formDataService.newCards;
  }
  
  cardDropped(ev) {
    // HACK: Only save schedule for single form, because this is getting called for every form
    if (ev.form == Form.I) {
      console.log('FormView: cardDropped, save schedule');
      this.formDataService.saveCards();
    }
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

  changeToDayView(ev) {
    // console.log(ev.target.textContent);
  }
}
