import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { API_URLS } from 'src/app/models/api';
import { PersonRegistration } from 'src/app/models/person';
import { FileHandle } from '../directive/dragDrop.directive';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  files: FileHandle[] = [];
  fName = new FormControl('', [Validators.required]);
  lName = new FormControl('', [Validators.required]);
  aadhar = new FormControl('', [Validators.required]);
  associateId = new FormControl('', [Validators.required]);
  person?: PersonRegistration;
  firstName?: string;
  lastName?: string;
  aadharId?: string;
  ctsAssociateId?: string;
  base64textString?: string;
  isSuccess?: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getErrorMessage(formControl: FormControl) {
    let errorMessage: string = '';
    if (formControl.hasError('required')) {
      errorMessage = 'This field is required';
    }
    if (formControl.hasError('email')) {
      errorMessage = 'Invalid Email'
    }
    return errorMessage;
  }


  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  registerAssociate() {
    this.person = new PersonRegistration();
    this.person.fName = this.firstName;
    this.person.lName = this.lastName;
    this.person.associateId = this.ctsAssociateId;
    this.person.adhaarNo = this.aadharId;
    this.person.image = this.base64textString;
    console.log(this.person);
    // this.registerAssociateToCloud(this.person);
  }

  registerAssociateToCloud(person: PersonRegistration) {
    console.log('Register person called');
    this.http.post(API_URLS.SAVE_PERSON_INFORMATION, person).subscribe(res => {
      this.isSuccess = res as boolean;
      console.info('Register Person response => ' + this.isSuccess);
    });
  }

  handleFileSelect() {
    this.isSuccess = false;
    var file = this.files[0];
    if (this.files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file.file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.registerAssociate();
  }
}
