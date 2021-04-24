import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';
import { PersonInformation } from 'src/app/models/person';
import { API_URLS } from 'src/app/models/api';
import { SignalRService } from '../service/signalr.service';

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
  messageId?: string;

  constructor(private http: HttpClient, private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.openWebCam();

    this.signalRService.init();
    console.log('Signal R Invoked');
    this.signalRService.mxChipData.subscribe(data => {
      console.log('Signal R Subscription Data =>' + data);
      let result = JSON.parse(data);
      if (result.messageId === this.messageId) {
        this.personInformation = result;
      } else {
        this.reset();
        this.onPersonInfoReceived.emit(undefined);
      }
      this.onShowLoaderOnServiceCall.emit(false);
    });
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
    this.webcamImage = webcamImage;
    var obj = { image: this.webcamImage.imageAsBase64 };
    console.log('Upload image API called here =>' + obj);
    this.http.post(API_URLS.UPLOAD_IMAGE_URL, obj).subscribe(res => {
      console.log('Upload image response response =>' + res);
      this.messageId = res as string;
    });
  }

  reset() {
    this.webcamImage = undefined;
    this.openWebCam();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
    console.log(this.errors);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
