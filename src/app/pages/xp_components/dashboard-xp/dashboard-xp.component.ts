import { Component, OnInit,ViewChild ,ChangeDetectionStrategy} from '@angular/core';
import { NbTabsetComponent } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
import { Router, Routes } from '@angular/router';
  // Adjust the path accordingly

import { DataService } from '../../../core/services/xp_services/data.service';

@Component({
  selector: 'ngx-dashboard-xp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-xp.component.html',
  styleUrls: ['./dashboard-xp.component.scss']
})
export class DashboardXPComponent implements OnInit {
  iterationStats: any;
  userStoryStats: any;
  taskStats: any;
  bugStats: any; 
  affichage1=true
  affichage2=true
  affichage3=true
  affichage4=true
  affichage5=true
  affichage6=true

  selectedAction: string = '';

  setAction(action: string): void {
    this.selectedAction = action;
  }
  constructor(private sidebarService: NbSidebarService,private router: Router,private dataService: DataService) {}

  

  toggleSidebar(): void {
    this.sidebarService.toggle(true, 'menu-sidebar');
  }
  Afficher1(){
    this.affichage1=!this.affichage1
  }
  Afficher2(){
    this.affichage2=!this.affichage2
  }
  Afficher3(){
    this.affichage3=!this.affichage3
  }
  Afficher4(){
    this.affichage4=!this.affichage4
  }
  Afficher5(){
    this.affichage5=!this.affichage5
  }
  Afficher6(){
    this.affichage6=!this.affichage6
  
}
ngOnInit(): void {
}



}