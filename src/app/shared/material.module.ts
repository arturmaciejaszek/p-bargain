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
  MatSelectModule,
  MatIconModule
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
      MatSelectModule,
      MatIconModule
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
      MatSelectModule,
      MatIconModule
    ]
})
export class MaterialModule {}
