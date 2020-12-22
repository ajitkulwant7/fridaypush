import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockpapersissorsComponent } from './rockpapersissors.component';

describe('RockpapersissorsComponent', () => {
  let component: RockpapersissorsComponent;
  let fixture: ComponentFixture<RockpapersissorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RockpapersissorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RockpapersissorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
