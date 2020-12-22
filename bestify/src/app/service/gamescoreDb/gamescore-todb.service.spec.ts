import { TestBed } from '@angular/core/testing';

import { GamescoreTodbService } from './gamescore-todb.service';

describe('GamescoreTodbService', () => {
  let service: GamescoreTodbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamescoreTodbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
