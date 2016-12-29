import { Injectable } from '@angular/core';

import { Card } from './model';
import { Day, weekDays } from './enums';

@Injectable()
export class ConflictsService {

  constructor() { }

  compute(cards: Card[]): string {
    return 'not implemented';
    
  }
}
