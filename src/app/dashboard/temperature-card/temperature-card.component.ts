import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature-card',
  templateUrl: './temperature-card.component.html',
  styleUrls: ['./temperature-card.component.scss']
})
export class TemperatureCardComponent implements OnInit {

  temperature!: number;
  constructor() { }

  ngOnInit(): void {
    this.temperature = 95;
  }

}
