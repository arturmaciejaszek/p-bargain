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
  MatAutocompleteModule
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
      MatAutocompleteModule
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
      MatAutocompleteModule
    ]
})
export class MaterialModule {}
