import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellTabsComponent } from './shell-tabs.component';

describe('ShellTabsComponent', () => {
  let component: ShellTabsComponent;
  let fixture: ComponentFixture<ShellTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
