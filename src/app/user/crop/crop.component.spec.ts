import { AngularFireStorage } from 'angularfire2/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from './../../shared/shared.module';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from '@angular/core/testing';

import { CropComponent } from './crop.component';
import { AuthService } from '../../auth/auth.service';
import { ErrorHandler } from '../../shared/error-snackbar.service';

describe('Component: CropComponent', () => {
  let component: CropComponent;
  let fixture: ComponentFixture<CropComponent>;
  const firestoreSpy = jasmine.createSpyObj('AngularFireStorage', ['upload']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CropComponent],
      imports: [SharedModule, ImageCropperModule],
      providers: [
        { provide: AngularFireStorage, useValue: firestoreSpy },
        { provide: MAT_DIALOG_DATA, useValue: { data: 'dummyData' } },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: ErrorHandler, useValue: {} }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
