import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatTabsModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressBarModule,
  MatRadioModule,
  } from '@angular/material';

@NgModule({
    imports: [
      MatToolbarModule,
      MatCardModule,
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatButtonModule,
      MatCheckboxModule,
      MatInputModule,
      MatTabsModule,
      MatMenuModule,
      MatDialogModule,
      MatProgressBarModule,
      MatRadioModule,
    ],
    exports: [
      MatToolbarModule,
      MatCardModule,
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatButtonModule,
      MatCheckboxModule,
      MatInputModule,
      MatTabsModule,
      MatMenuModule,
      MatDialogModule,
      MatProgressBarModule,
      MatRadioModule,
    ]
})
export class MaterialModule {}
