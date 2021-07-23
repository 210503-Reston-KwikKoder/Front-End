import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingLeaderboardComponent } from './landing-leaderboard.component';

describe('LandingLeaderboardComponent', () => {
  let component: LandingLeaderboardComponent;
  let fixture: ComponentFixture<LandingLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingLeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
