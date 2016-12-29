/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConflictsService } from './conflicts.service';

describe('ConflictsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConflictsService]
    });
  });

  it('should ...', inject([ConflictsService], (service: ConflictsService) => {
    expect(service).toBeTruthy();
  }));
});
