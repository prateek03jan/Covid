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
    debugger;
    this.temperatureDetails;
  }

}
