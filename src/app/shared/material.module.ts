import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
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
    ],
    exports: [
      MatToolbarModule,
      MatCardModule,
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatButtonModule,
      MatCheckboxModule,
      MatInputModule,
    ]
})
export class MaterialModule {}
