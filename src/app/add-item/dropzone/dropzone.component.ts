import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { take } from 'rxjs/operators';

import { ErrorHandler } from './../../shared/error-snackbar.service';
@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  @Input() fileName: string;
  @Input() userUID: string;
  @Input() itemUID: string;
  @Output() photoLinkEmitter = new EventEmitter<string>();
  @Output() loadingEmitter = new EventEmitter<boolean>();
  fileNameDisplay: string;
  isHovering: boolean;
  task: AngularFireUploadTask;

  constructor(
    private afs: AngularFireStorage,
    private db: AngularFirestore,
    private resizer: Ng2ImgMaxService,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit() {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: File) {
    this.loadingEmitter.emit(true);
    const file = event;
    this.fileNameDisplay = event.name;

    const path = `items/${this.itemUID}/${this.fileName}`;

    this.resize(file)
      .pipe(take(1))
      .subscribe(blob => {
        this.task = this.afs.upload(path, blob);

        this.task
          .then(res => {
            this.photoLinkEmitter.emit(res.downloadURL);
            this.loadingEmitter.emit(false);
            this.task = null;
          })
          .catch(err => this.errorHandler.show('failed to upload', null));
      });
  }

  // 10000 is keeping ratio
  resize(file) {
    return this.resizer.resizeImage(file, 10000, 500);
  }
}
