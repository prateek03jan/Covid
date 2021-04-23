import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonInformation } from 'src/app/models/person';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  person?: PersonInformation;
  showLoader?: boolean = false;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updatePersonInformation(event: any) {
    debugger;
    this.person = event;
    this.openSnackBar('p', 'p');
    console.log('At parent level response from RetrievePersonInfo =>' + this.person);
    if ((this.person as any).exceptionMsg) {
      console.error((this.person as any).exceptionMsg);
      this.openSnackBar((this.person as any).exceptionMsg, '');
    }
  }

  showLoaderOnServiceCall(event: any) {
    this.showLoader = event as boolean;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
