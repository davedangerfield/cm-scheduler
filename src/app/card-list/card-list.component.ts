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
    
    // dragulaService.drag.subscribe((value) => {
    //   this.onDrag(value.slice(1));
    // });
    // dragulaService.drop.subscribe((value) => {
    //   this.onDrop(value.slice(1));
    // });
    // dragulaService.over.subscribe((value) => {
    //   this.onOver(value.slice(1));
    // });
    // dragulaService.out.subscribe((value) => {
    //   this.onOut(value.slice(1));
    // });
  }
  private onDropModel(args) {
    let [el, target, source] = args;
    // console.log('dropModel', args.length);
    // console.log('el', el);
    // console.log('target', target);
    // console.log('source', source);
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    console.log('removeModel');
  }

  // private hasClass(el: any, name: string) {
  //   return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  // }

  // private addClass(el: any, name: string) {
  //   if (!this.hasClass(el, name)) {
  //     el.className = el.className ? [el.className, name].join(' ') : name;
  //   }
  // }

  // private removeClass(el: any, name: string) {
  //   if (this.hasClass(el, name)) {
  //     el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
  //   }
  // }

  // private onDrag(args) {
  //   let [e, el] = args;
  //   // this.removeClass(e, 'ex-moved');
  //   console.log('onDrag');
  // }

  // private onDrop(args) {
  //   let [e, el] = args;
  //   // this.addClass(e, 'ex-moved');
  //   console.log('onDrop');
  // }

  // private onOver(args) {
  //   let [e, el, container] = args;
  //   // this.addClass(el, 'ex-over');
  //   console.log('onOver');
  // }

  // private onOut(args) {
  //   let [e, el, container] = args;
  //   // this.removeClass(el, 'ex-over');
  //   console.log('onOut');
  // }


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

  teacherInvolvement(card: Card) {
    return Involvement[card.teacherInvolvement].toLowerCase();
  }
}
