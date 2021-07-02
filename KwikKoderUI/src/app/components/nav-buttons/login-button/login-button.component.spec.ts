import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;
  let auth : AuthService;

  class MockAuthService {
    logout() {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ LogoutButtonComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
      ]
    })
    .compileComponents();

    auth = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

