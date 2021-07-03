import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCompsComponent } from './live-comps.component';

describe('LiveCompsComponent', () => {
  let component: LiveCompsComponent;
  let fixture: ComponentFixture<LiveCompsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveCompsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
