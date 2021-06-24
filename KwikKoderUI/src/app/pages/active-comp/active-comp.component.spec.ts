import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCompComponent } from './active-comp.component';

describe('ActiveCompComponent', () => {
  let component: ActiveCompComponent;
  let fixture: ComponentFixture<ActiveCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
