import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';
import { PersonInformation } from 'src/app/models/person';
import { API_URLS } from 'src/app/models/api';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-person-info-card',
  templateUrl: './person-info-card.component.html',
  styleUrls: ['./person-info-card.component.scss']
})
export class PersonInfoCardComponent implements OnInit {

  personInformation?: PersonInformation;
  private trigger: Subject<void> = new Subject<void>();
  public multipleWebcamsAvailable = false;
  webcamImage: WebcamImage | undefined;
  public errors: WebcamInitError[] = [];
  @Output() onPersonInfoReceived = new EventEmitter<PersonInformation>();
  @Output() onShowLoaderOnServiceCall = new EventEmitter<boolean>();

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
    this.onShowLoaderOnServiceCall.emit(true);
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    var obj = { image: this.webcamImage.imageAsBase64 };
    this.http.post(API_URLS.RETRIEVE_PERSON_INFORMATION, obj).subscribe(res => {
      this.mapRetrievePersonInfoResponse(res);
    });
  }

  private mapRetrievePersonInfoResponse(res: Object) {
    this.personInformation = res;
    console.log(this.personInformation);
    if (this.personInformation?.personDetails) {
      this.onPersonInfoReceived.emit(this.personInformation);
    } else {
      this.reset();
    }
    this.onShowLoaderOnServiceCall.emit(false);
  }

  reset() {
    // this.webcamImage = undefined;
    // this.openWebCam();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
    console.log(this.errors);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
