import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person-info-card',
  templateUrl: './person-info-card.component.html',
  styleUrls: ['./person-info-card.component.scss']
})
export class PersonInfoCardComponent implements OnInit {

  private trigger: Subject<void> = new Subject<void>();
  public multipleWebcamsAvailable = false;
  webcamImage: WebcamImage | undefined;
  public errors: WebcamInitError[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.openWebCam();
  }

  openWebCam() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    this.http.post('https://api.imgur.com/3/image', this.webcamImage).subscribe(res=> {
      debugger;
      console.log(res);
    });
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
    console.log(this.errors);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
