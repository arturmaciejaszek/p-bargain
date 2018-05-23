import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainsMobileComponent } from './bargains-mobile.component';

describe('BargainsMobileComponent', () => {
  let component: BargainsMobileComponent;
  let fixture: ComponentFixture<BargainsMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BargainsMobileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
