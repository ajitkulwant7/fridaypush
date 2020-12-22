import { TestBed } from '@angular/core/testing';

import { QuizlistService } from './display-quiz.service';

describe('DisplayQuizService', () => {
  let service: QuizlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
