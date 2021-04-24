import { Component, Input, OnInit } from '@angular/core';
import { PersonDetails, PersonInformation } from 'src/app/models/person';

@Component({
  selector: 'app-temperature-card',
  templateUrl: './temperature-card.component.html',
  styleUrls: ['./temperature-card.component.scss']
})
export class TemperatureCardComponent implements OnInit {

  @Input() personInformation?: PersonDetails;

  constructor() { }

  ngOnInit(): void {
  }

  getTemperatureClass(): string {
    if (this.personInformation != undefined) {
      return (this.personInformation?.currentTemp || '') >
        (this.personInformation?.maxTemp || '') ? 'red' : 'green';
    }
    return 'red';
  }
}
