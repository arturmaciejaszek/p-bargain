import { AuthGuard } from './../auth/auth.guard';
import { AuthComponent } from './../auth/auth.component';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import * as fromRoot from '../app.reducer';
import { WelcomeComponent } from './welcome.component';

describe('Component: WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let store: Store<fromRoot.State>;
  let router: Router;
  let routerSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      imports: [
        StoreModule.forRoot(fromRoot.reducers),
        RouterTestingModule.withRoutes([])
      ]
    });
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show bargain loading spinner', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const svgPaths = element.querySelectorAll('path');
    let svgLength = 0;
    Array.from(svgPaths).forEach((path: SVGPathElement) => {
      svgLength = svgLength + path.getTotalLength();
    });
    expect(svgLength).toEqual(163.57464981079102);
  });

  it('should redirect to login screen if no one is logged', () => {
    spyOn(store, 'pipe').and.returnValue(of(false));
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledWith(['/auth']);
  });

  it('should redirect to shop component if someone is logged', () => {
    spyOn(store, 'pipe').and.returnValue(of(true));
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledWith(['/shop']);
  });

  it('should do nothing upon receiving initial auth State (null)', () => {
    spyOn(store, 'pipe').and.returnValue(of(null));
    fixture.detectChanges();
    expect(routerSpy).not.toHaveBeenCalled();
  });
});
