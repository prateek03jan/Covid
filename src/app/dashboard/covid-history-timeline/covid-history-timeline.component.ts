import { Component, OnInit } from '@angular/core';
import { CovidHistory } from 'src/app/entities/covid-history';

@Component({
  selector: 'app-covid-history-timeline',
  templateUrl: './covid-history-timeline.component.html',
  styleUrls: ['./covid-history-timeline.component.scss']
})
export class CovidHistoryTimelineComponent implements OnInit {

  covidHistories?: Array<CovidHistory> = [];
  constructor() { }

  ngOnInit(): void {
    this.hardCodeData();
  }

  hardCodeData() {
    let covidData: CovidHistory = new CovidHistory();
    covidData.date = 'Jan 20, 2021';
    covidData.description = "Prateek reported to hospital with symptoms of COVID-19. Sample was taken for examination.";
    covidData.headline = "Reported Symptoms";
    this.covidHistories?.push(covidData);

    covidData = new CovidHistory();
    covidData.date = 'Jan 24, 2021';
    covidData.description = "The sample submitted by Prateek was found to be COVID +ve. The hospital advised him to avail self-isolation.";
    covidData.headline = "COVID Detected";
    this.covidHistories?.push(covidData);

    covidData = new CovidHistory();
    covidData.date = 'Feb 15, 2021';
    covidData.description = "Retested sample taken from patient was found to be COVID -ve. The patient was prescribed for early dose of vaccination.";
    covidData.headline = "COVID Cured";
    this.covidHistories?.push(covidData);
    this.covidHistories?.push(covidData);
    this.covidHistories?.push(covidData);
    this.covidHistories?.push(covidData);
    this.covidHistories?.push(covidData);
  }

}
