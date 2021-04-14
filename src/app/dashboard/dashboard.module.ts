import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PersonInfoCardComponent } from './person-info-card/person-info-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MzdTimelineModule } from 'ngx-mzd-timeline';
import { TemperatureCardComponent } from './temperature-card/temperature-card.component';
import { CovidHistoryTimelineComponent } from './covid-history-timeline/covid-history-timeline.component';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DashboardComponent,
    PersonInfoCardComponent,
    TemperatureCardComponent,
    CovidHistoryTimelineComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MzdTimelineModule,
    WebcamModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
