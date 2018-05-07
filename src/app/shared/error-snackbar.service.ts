import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorHandler {

    constructor(private snackBar: MatSnackBar) {}

    show(msg: string, action: any) {
        this.snackBar.open(msg, action, {
            duration: 1000
        });
    }
}
