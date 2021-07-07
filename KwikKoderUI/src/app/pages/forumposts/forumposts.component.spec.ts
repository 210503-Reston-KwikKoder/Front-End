import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumpostsComponent } from './forumposts.component';

describe('ForumpostsComponent', () => {
  let component: ForumpostsComponent;
  let fixture: ComponentFixture<ForumpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumpostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
