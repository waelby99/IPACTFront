import { Component } from '@angular/core';
import { DefinitionsComponent } from './definitions/definitions.component';
import { LimitationComponent } from './limitation/limitation.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { KeyfactorsComponent } from './keyfactors/keyfactors.component';
import { PracticeComponent } from './practice/practice.component';
import { ImplementationComponent } from './Implementation/implementation.component';
import { DigramsComponent } from './digrams/digrams.component';
import { ImpactComponent } from './impact/impact.component'
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-xp-methodology',
  templateUrl: './xp-methodology.component.html',
  styleUrls: ['./xp-methodology.component.scss']
})
export class XpMethodologyComponent {
  currentStep = 0;

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onTabChange(event: any) {
    this.currentStep = event.tabIndex;
  }
  affichage1=true
  affichage2=true
  affichage3=true
  affichage4=true
  affichage5=true
  affichage6=true

  navigateToDashboard() {
    this.router.navigate(['/pages/agile/XPdash']);
  }
  constructor(private http: HttpClient, private router: Router,private toastrService: NbToastrService) {}
  
  deleteAllDocuments() {
    if (window.confirm('Are you sure you want to delete this XPinformtion?')) {
    this.http.delete('http://localhost:8090/api/tutoriels/deleteAll')
      .subscribe({
        next: () => this.toastrService.success('All documents deleted successfully!', 'Success'),
        error: (err) => this.toastrService.danger('Failed to delete documents.', 'Error')
      });
    }
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
}
