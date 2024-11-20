import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { xpmethodologyModule } from './xp_components/XPTutoriel/xp-methodology.model'
import { DashboardXPModule  } from './xp_components/dashboard-xp/dashboard-xp.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    DashboardXPModule,
    xpmethodologyModule,
  ],
  declarations: [
    PagesComponent,
    
    
  ],
})
export class PagesModule {
}
