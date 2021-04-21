import { Component, Input, OnInit } from '@angular/core';
import { CovidHistoryInfo } from 'src/app/models/person';

@Component({
  selector: 'app-covid-history-timeline',
  templateUrl: './covid-history-timeline.component.html',
  styleUrls: ['./covid-history-timeline.component.scss']
})
export class CovidHistoryTimelineComponent implements OnInit {

  @Input() covidHistory?: Array<CovidHistoryInfo>;

  constructor() { 
  }
  
  ngOnInit(): void {
    console.log(this.covidHistory);
  }

}
