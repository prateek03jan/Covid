import { Component, Input, OnInit } from '@angular/core';
import { Temperature } from 'src/app/models/person';

@Component({
  selector: 'app-temperature-card',
  templateUrl: './temperature-card.component.html',
  styleUrls: ['./temperature-card.component.scss']
})
export class TemperatureCardComponent implements OnInit {

  @Input() temperatureDetails?: Temperature;

  constructor() { }

  ngOnInit(): void {
  }

  getTemperatureClass(): string {
    if (this.temperatureDetails != undefined) {
      return (this.temperatureDetails?.currentTemp || '') >
        (this.temperatureDetails?.maxTemp || '') ? 'red' : 'green';
    }
    return 'red';
  }
}
