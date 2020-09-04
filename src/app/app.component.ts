import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  constraints = {
    video: {
      facingMode: 'user',
    },
  };
  videoWidth = 0;
  videoHeight = 0;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('../../../../assets/models/'),
      faceapi.nets.faceLandmark68Net.loadFromUri('../../../../assets/models/'),
      faceapi.nets.faceRecognitionNet.loadFromUri('../../../../assets/models/'),
      faceapi.nets.faceExpressionNet.loadFromUri('../../../../assets/models/'),
      faceapi.nets.ageGenderNet.loadFromUri('../../../../assets/models/'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('../../../../assets/models/'),
    ]).then((value: any) => {
      console.log(faceapi, 'face api console');
    });
    this.startCamera();
  }

  startCamera() {
    console.log('navigator.mediaDevices', navigator.mediaDevices);
    console.log(
      'navigator.mediaDevices.getUserMedia',
      navigator.mediaDevices.getUserMedia
    );
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  attachVideo(stream) {
    this.videoElement.nativeElement.srcObject = stream;
  }
}
