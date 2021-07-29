import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTestComputeComponent } from './user-test-compute.component';

describe('UserTestComputeComponent', () => {
  let component: UserTestComputeComponent;
  let fixture: ComponentFixture<UserTestComputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTestComputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTestComputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
