import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule, NbAlertModule,
  NbActionsModule,
  NbRadioModule,
  NbSelectModule,
  NbLayoutModule,
  NbIconModule,
} from '@nebular/theme';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../../@theme/theme.module';
import { NewsService } from '../../layout/news.service';
import { DefinitionsComponent } from './definitions/definitions.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ImpactComponent } from './impact/impact.component';
import { KeyfactorsComponent } from './keyfactors/keyfactors.component';
import { LimitationComponent } from './limitation/limitation.component';
import { PracticeComponent } from './practice/practice.component';
import { XpMethodologyComponent } from './xp-methodology.component';
import { ImplementationComponent } from './Implementation/implementation.component';
import { DigramsComponent } from './digrams/digrams.component';
import { DashboardXPComponent } from './../dashboard-xp/dashboard-xp.component'; // Update with your actual path

const routes: Routes = [
  {
    path: '',
    component: XpMethodologyComponent,
  },
  
 // other routes here
  
];
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    Ng2SmartTableModule,
    CommonModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbAlertModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbIconModule,
    NbLayoutModule,
        RouterModule.forChild(routes),
  ],
  declarations: [
    DefinitionsComponent,
    BenefitsComponent,
    ImpactComponent,
    KeyfactorsComponent,
    LimitationComponent,
    PracticeComponent,
    XpMethodologyComponent,
    ImplementationComponent,
    DigramsComponent
  ],
  providers: [
    NewsService,
  ],
})
export class xpmethodologyModule { }