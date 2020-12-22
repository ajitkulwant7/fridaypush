import { TestBed } from '@angular/core/testing';

import { GamescoreService } from './gamescore.service';

describe('GamescoreService', () => {
  let service: GamescoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamescoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
