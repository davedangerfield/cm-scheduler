import { Component, Input, OnInit } from '@angular/core';

import { Card } from '../shared/model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input() cards: Array<Card>;

  constructor() { }

  ngOnInit() {
  }

}
