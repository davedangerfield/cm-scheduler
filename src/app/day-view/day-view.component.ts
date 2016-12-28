import { Component, Input, OnInit } from '@angular/core';

import { Card } from '../shared/model';
import { Form } from '../shared/enums';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit {

  @Input() cards: Card[];
  
  private selectedForm: Form;
  private forms: Form[] = [Form.I, Form.IIA, Form.III];

  constructor() { }

  ngOnInit() {
    this.selectedForm = Form.I;
  }

  formName(form: Form) {
    return Form[form];
  }

  onChangeForm(selection) {
    this.selectedForm = selection;
  }

  formFilter() {
    return this.cards.filter(card => card.formLevel == this.selectedForm);
  }
}
