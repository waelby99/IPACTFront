import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbAccordionModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbThemeModule, NbLayoutModule ,
  NbSidebarModule,
  NbMenuModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbProgressBarModule,
  NbStepperModule,
  NbDatepickerModule,
  NbInputModule,
  NbAlertModule,
  NbToastrModule
     // Make sure to import NbMenuModule here
} from '@nebular/theme';


import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { ThemeModule } from '../../../@theme/theme.module';
import { DashboardXPComponent } from './dashboard-xp.component';
import { FormsModule } from '@angular/forms';
import { IterationComponent } from './iteration/iteration.component';
import { UserStoryComponent } from './user-story/user-story.component';
import { TaskComponent } from './task/task.component';

import { RouterModule, Routes } from '@angular/router';
import { BugComponent } from './bug/bug.component';
import { FilterByStatusPipe } from './user-story/filter-by-status.pipe';
import { FilterPipe } from './task/filter.pipe';

import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { KpiUserStoriesComponent } from './kpi-user-stories/kpi-user-stories.component';
import { KpiIterationComponent } from './kpi-iteration/kpi-iteration.component';
import { KpiTaskComponent } from './kpi-task/kpi-task.component';
import { KpiBugsComponent } from './kpi-bugs/kpi-bugs.component';

const routes: Routes = [
  { path: '', component: DashboardXPComponent },
  { path: 'iteration', component: IterationComponent },
  { path: 'user-story', component: UserStoryComponent },
  { path: 'task', component: TaskComponent },


];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule.forRoot(),
    NbThemeModule,
    NbLayoutModule,
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
    NbAccordionModule,
    NbSidebarModule,
    NbMenuModule,
    NbProgressBarModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    CKEditorModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbStepperModule,
    NbAlertModule,
    NbToastrModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DashboardXPComponent,
    IterationComponent,
    UserStoryComponent,
    TaskComponent,
    BugComponent,
    FilterByStatusPipe,
    FilterPipe,
    GanttChartComponent,
    KpiUserStoriesComponent,
    KpiIterationComponent,
    KpiTaskComponent,
    KpiBugsComponent,
  ],
})
export class DashboardXPModule { }
