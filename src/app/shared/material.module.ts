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
  MatProgressBarModule
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
      MatProgressBarModule
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
      MatProgressBarModule
    ]
})
export class MaterialModule {}
