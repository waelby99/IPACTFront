import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { FormsModule } from '@angular/forms';
import { IterationComponent } from './iteration/iteration.component';
import { UserStoryComponent } from './user-story/user-story.component';
import { TaskComponent } from './task/task.component';
import { PairProgrammingComponent } from './pair-programming/pair-programming.component';
import { TddComponent } from './tdd/tdd.component';
import { CiComponent } from './ci/ci.component';
import { CodeReviewComponent } from './code-review/code-review.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'iteration', component: IterationComponent },
  { path: 'user-story', component: UserStoryComponent },
  { path: 'task', component: TaskComponent },
  { path: 'pair-programming', component: PairProgrammingComponent },
  { path: 'tdd', component: TddComponent },
  { path: 'ci', component: CiComponent },
  { path: 'code-review', component: CodeReviewComponent },
];
@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
    IterationComponent,
    UserStoryComponent,
    TaskComponent,
    PairProgrammingComponent,
    TddComponent,
    CiComponent,
    CodeReviewComponent,
  ],
})
export class DashboardModule { }
