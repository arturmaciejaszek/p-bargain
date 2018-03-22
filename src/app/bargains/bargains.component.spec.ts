import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainsComponent } from './bargains.component';

describe('BargainsComponent', () => {
  let component: BargainsComponent;
  let fixture: ComponentFixture<BargainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
