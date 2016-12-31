import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Card } from '../shared/model';
import { Day, weekDays, Form, allForms } from '../shared/enums';
import { FormDataService } from '../shared/form-data.service';
import { ConflictsService } from '../shared/conflicts.service';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit {

  private cards: {};
  private selectedForm: Form;
  private forms: Form[] = allForms;
  private days: Day[] = weekDays;
  private conflicts: string[];
  // private min;
  // private max;

  constructor(
    private formDataService: FormDataService,
    private conflictsService: ConflictsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    var formId = Number(this.route.snapshot.params['formId']);
    this.selectedForm = formId > -1 ? this.forms[formId] : this.forms[0];
      // TODO Use observable form of route instead of snapshot
      // (+) converts string 'id' to a number
      // .switchMap((params: Params) => this.service.getHero(+params['id']))
      // .subscribe((hero: Hero) => this.hero = hero);
    this.cards = this.formDataService.newCards;
  }

  cardDropped(ev) {
    // HACK: Only save schedule for single day, because this is getting called for every day
    if (ev.day == weekDays[1]) {
      console.log('DayView: cardDropped, save schedule');
      this.formDataService.saveCards();
    }
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

  changeToFormView(ev) {
    // console.log(ev.target.textContent);
  }
  
  showConflicts() {
    // this.conflicts = this.conflictsService.compute(this.cards);
  }

  // onChangeMin(min) {
  //   this.min = min;
  //   this.conflicts = this.conflictsService.showInvolvementConflicts(Day.Monday, min, this.max, this.cards);
  // }
  
  // onChangeMax(max) {
  //   this.max = max;
  //   this.conflicts = this.conflictsService.showInvolvementConflicts(Day.Monday, this.min, max, this.cards);

  // }

}
