import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';
import { PersonInformation } from 'src/app/models/person';

@Component({
  selector: 'app-person-info-card',
  templateUrl: './person-info-card.component.html',
  styleUrls: ['./person-info-card.component.scss']
})
export class PersonInfoCardComponent implements OnInit {

  private getPersonInfoURL = 'http://smartscanner-api.azurewebsites.net/api/smartScanner/getPersonDetails';
  personInformation?: PersonInformation;
  private trigger: Subject<void> = new Subject<void>();
  public multipleWebcamsAvailable = false;
  webcamImage: WebcamImage | undefined;
  public errors: WebcamInitError[] = [];
  @Output() onPersonInfoReceived = new EventEmitter<PersonInformation>();

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
    console.log(webcamImage);
    var obj = { image: this.webcamImage.imageAsBase64 };
    this.http.post(this.getPersonInfoURL, obj).subscribe(res => {
      this.personInformation = res;
      this.onPersonInfoReceived.emit(this.personInformation);
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
