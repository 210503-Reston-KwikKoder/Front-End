import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { DisplayCategoryPipe } from '../../pipes/display-category.pipe';

import { PlayerTestAreaComponent } from './player-test-area.component';

describe('PlayerTestAreaComponent', () => {
  let component: PlayerTestAreaComponent;
  let fixture: ComponentFixture<PlayerTestAreaComponent>;

  @Pipe({name: 'displayCategory'})
    class MockPipe implements PipeTransform{
      transform(value: number): number{
        return value;
      }
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTestAreaComponent, MockPipe],
      providers: [
        {provide: DisplayCategoryPipe, useClass: MockPipe},
      ]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(PlayerTestAreaComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call', () => {
    fixture = TestBed.createComponent(PlayerTestAreaComponent);
    component = fixture.componentInstance;
    expect(component.ngOnInit()).toHaveBeenCalled;
  });

});
