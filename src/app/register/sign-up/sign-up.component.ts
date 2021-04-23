import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { API_URLS } from 'src/app/models/api';
import { PersonRegistration } from 'src/app/models/person';
import { FileHandle } from '../directive/dragDrop.directive';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  files: FileHandle[] = [];
  fName = new FormControl('', [Validators.required]);
  lName = new FormControl('', [Validators.required]);
  aadhar = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]);
  associateId = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]);
  person?: PersonRegistration;
  firstName?: string;
  lastName?: string;
  aadharId?: string;
  ctsAssociateId?: string;
  base64textString?: string;
  isSuccess?: boolean = true;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  getErrorMessageFname(formControl: FormControl) {
    let errorMessage: string = '';
    if (formControl.hasError('required')) {
      errorMessage = 'First Name is required';
    }
    return errorMessage;
  }

  getErrorMessageLname(formControl: FormControl) {
    let errorMessage: string = '';
    if (formControl.hasError('required')) {
      errorMessage = 'Last Name is required';
    }
    return errorMessage;
  }

  getErrorMessageAadhar(formControl: FormControl) {
    let errorMessage: string = '';
    if (formControl.hasError('required')) {
      errorMessage = 'Aadhar is required';
    } else if (formControl.hasError('pattern')) {
      errorMessage = 'Enter 12 digits aadhar number';
    }
    return errorMessage;
  }

  getErrorMessageAssociateId(formControl: FormControl) {
    let errorMessage: string = '';
    if (formControl.hasError('required')) {
      errorMessage = 'Associate Id is required';
    } else if (formControl.hasError('pattern')) {
      errorMessage = 'Enter 6 digits associate id';
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
    this.registerAssociateToCloud(this.person);
  }

  registerAssociateToCloud(person: PersonRegistration) {
    console.log('Register person called');
    this.http.post(API_URLS.SAVE_PERSON_INFORMATION, person).subscribe(res => {
      this.isSuccess = res as boolean;
      console.info('Register Person response => ' + this.isSuccess);
      if (this.isSuccess === true) {
        this.openSnackBar('Registration is successful...');
        this.resetForm();
      } else {
        this.openSnackBar('There is some error...' + (res as any).exceptionMsg);
      }
    });
  }

  resetForm() {
    this.files = [];
    this.fName = new FormControl('', [Validators.required]);
    this.lName = new FormControl('', [Validators.required]);
    this.aadhar = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]);
    this.associateId = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]);
    this.person = undefined;
    this.firstName = '';
    this.lastName = '';
    this.aadharId = '';
    this.ctsAssociateId = '';
    this.base64textString = '';
    this.isSuccess = true;
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

  openSnackBar(message: string) {
    this._snackBar.open(message);
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 3000);
  }
}
