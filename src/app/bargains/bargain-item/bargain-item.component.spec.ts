import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainItemComponent } from './bargain-item.component';

describe('BargainItemComponent', () => {
  let component: BargainItemComponent;
  let fixture: ComponentFixture<BargainItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
