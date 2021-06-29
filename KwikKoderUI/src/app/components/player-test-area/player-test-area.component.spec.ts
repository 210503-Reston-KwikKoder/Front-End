import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTestAreaComponent } from './player-test-area.component';

describe('PlayerTestAreaComponent', () => {
  let component: PlayerTestAreaComponent;
  let fixture: ComponentFixture<PlayerTestAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTestAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTestAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
