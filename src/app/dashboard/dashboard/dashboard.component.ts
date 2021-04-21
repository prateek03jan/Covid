import { Component, OnInit } from '@angular/core';
import { PersonInformation } from 'src/app/models/person';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  person?: PersonInformation;
  constructor() { }

  ngOnInit(): void {
  }

  updatePersonInformation(event: any) {
    this.person = event;
  }

}
