import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { Card } from '../shared/model';
import { Day, Form, ActivityType, Involvement } from '../shared/enums';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  // viewProviders: [DragulaService],
})
export class CardListComponent {

  @Input() cards: Card[];
  @Input() bag: string; // The dragula 'bag'.
  @Input() day: Day;
  @Input() form: Form;
  @Output() cardDropped = new EventEmitter();

  constructor(private dragulaService: DragulaService) {

    // const bag: any = this.dragulaService.find('main-bag');
    // if (bag !== undefined ) this.dragulaService.destroy('main-bag');
    // dragulaService.setOptions('main-bag', {
    //   revertOnSpill: true // If you drag over a valid container, but drop outside one, card goes back where it started.
    // });
    dragulaService.dropModel.subscribe((value) => {
      // this.onDropModel(value.slice(1));
      // Emit an event informing parent to save cards to localstorage.
      this.cardDropped.emit({day: this.day, form: this.form});
    
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
    
    
  }
  
  private onRemoveModel(args) {
    let [el, source] = args;
    throw 'Removed a card!!';
  }

  height(card: Card) {
    const HEIGHT_PIXELS_PER_MINUTE = 5;
    return card.duration * HEIGHT_PIXELS_PER_MINUTE;
  }

  backgroundColor(card: Card) {
    var backgroundColorMap = {
      [Form.I]: '#05fc70',
      [Form.IIA]: '#5ed9ff',
      [Form.III]: '#fcd305',
    }
    return backgroundColorMap[card.formLevel];
  }

  cardDetails(form, card) {
    if (card.title == 'break') return '';
    return `${this.formName(form, card)}/${card.daysPerWeek}x/${card.duration}`;
  }

  activityTypeSymbol(card: Card) {
    var activityTypeSymbolMap = {
      [ActivityType.AT]:'@', 
      [ActivityType.BLANK]:'',
      [ActivityType.MINUS]:'-',
      [ActivityType.PLUS]:'+'
    };
    return activityTypeSymbolMap[card.activityType];
  }

  formName(form: Form, card: Card) {
    return Form[card.formLevel];
  }

  teacherInvolvementClass(card: Card) {
    return Involvement[card.teacherInvolvement].toLowerCase();
  }

  conflictClass(card: Card) {
    return card.conflict ? 'conflict' : '';
  }
}
