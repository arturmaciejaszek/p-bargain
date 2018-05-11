import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { AngularFireStorage } from 'angularfire2/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

import { ErrorHandler } from './../../shared/error-snackbar.service';
@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {
  @ViewChild('cropper', undefined)
  cropper;
  data: any;
  cropperSettings: CropperSettings;

  uploadPercent: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private passedData: { file: File; uid: string },
    private dialogRef: MatDialogRef<CropComponent>,
    private afs: AngularFireStorage,
    private authService: AuthService,
    private errorHandler: ErrorHandler
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 250;
    this.cropperSettings.croppedHeight = 250;
    // this.cropperSettings.canvasWidth = 600;
    // this.cropperSettings.canvasHeight = 450;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.canvasWidth = window.innerWidth * 0.6;
    this.cropperSettings.canvasHeight = window.innerHeight * 0.5;
    this.cropperSettings.rounded = true;

    this.cropperSettings.cropperDrawSettings.strokeColor =
      'rgba(244, 67, 54, 1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    this.data = {};
  }

  ngOnInit() {
    const image: any = new Image();
    const file: File = this.passedData.file;
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  upload() {
    const filePath = `/users/${this.passedData.uid}/thumb.jpg`;
    const img = this.convertToBlob(this.data.image);
    const task = this.afs.upload(filePath, img);
    this.uploadPercent = task.percentageChanges();

    task
      .then(res => this.updatePhoto(res.downloadURL))
      .catch(err => this.errorHandler.show(err.msg, null));
  }

  updatePhoto(photoURL: string) {
    this.authService
      .updateData(this.passedData.uid, { photoURL: photoURL })
      .then(_ => this.dialogRef.close())
      .catch(err => this.errorHandler.show(err.msg, null));
  }

  convertToBlob(base64Str: string): Blob {
    const binary = atob(base64Str.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  discard() {
    this.dialogRef.close();
  }
}
