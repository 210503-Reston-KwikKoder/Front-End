import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { DisplayCategoryPipe } from 'src/app/pipes/display-category.pipe';
import { RestService } from 'src/Services/rest.service';
import { of } from 'rxjs';

import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

describe('ProfileComponent', () => {

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  class MockAuthService {
   user$: Observable<string> = of('')
   idTokenClaims$: Observable<string> = of('')
  }

  class MockRestService
  {

    getUserName(): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }

    getUserStats(): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }

    getOverallStats(): Promise<any>{
      return new Promise<void>((resolve,reject)=> {});
    }
  }

  @Pipe({name: 'displayCategory'})
  class MockPipe implements PipeTransform {
      transform(value: number): number {
          //Do stuff here, if you want
          return value;
      }
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ProfileComponent],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: RestService, useClass: MockRestService},
        {provide: ActivatedRoute,useValue: {id: 0}},
        {provide: DisplayCategoryPipe, useClass: MockPipe},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
