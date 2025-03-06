import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { provideRouter, Router } from '@angular/router';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HeaderComponent, AppComponent],
      providers: [provideRouter([
        { path: 'home', component: TestComponent },
        { path: 'login', component: TestComponent }
      ])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isVisible to false for /login route', fakeAsync(() => {
    router.navigateByUrl('/login');
    tick(); 
    fixture.detectChanges();

    expect(component.isVisible).toBeFalse();
  }));

  it('should set isVisible to true for non-login routes', fakeAsync(() => {
    router.navigateByUrl('/home');
    tick();
    fixture.detectChanges();

    expect(component.isVisible).toBeTrue();
  }));

  it('should initialize isVisible based on current route', fakeAsync(() => {
    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();

    expect(component.isVisible).toBeTrue();
  }));
});

@Component({ selector: 'app-test', template: '' })
class TestComponent {}