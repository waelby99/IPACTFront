import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeyFactor } from '../../../../core/models/xp_models/xp_tutoriel_model/KeyFactor';
import { KeyFactorService } from '../../../../core/services/xp_services/xp_tutoriel_services/keyfactor.service';
import { NbToastrService, NbComponentStatus, NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-keyfactors',
  templateUrl: './keyfactors.component.html',
  styleUrls: ['./keyfactors.component.scss']
})
export class KeyfactorsComponent implements OnInit {
  keyFactors: KeyFactor[] = [];
  currentKeyFactor: KeyFactor | null = null;
  keyFactorForm: FormGroup;
  isFormVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private keyFactorService: KeyFactorService,
    private toastrService: NbToastrService
  ) {
    this.keyFactorForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadKeyFactors();
  }

  loadKeyFactors(): void {
    this.keyFactorService.getAllKeyFactors().subscribe(data => {
      this.keyFactors = data;
    });
  }

  showAddForm(): void {
    this.currentKeyFactor = null;
    this.keyFactorForm.reset();
    this.isFormVisible = true;
  }

  showEditForm(keyFactor: KeyFactor): void {
    this.currentKeyFactor = keyFactor;
    this.keyFactorForm.patchValue(keyFactor);
    this.isFormVisible = true;
  }

  saveKeyFactor(): void {
    if (this.keyFactorForm.valid) {
      const { titre, description } = this.keyFactorForm.value;
      if (this.currentKeyFactor) {
        this.keyFactorService.updateKeyFactor(this.currentKeyFactor.id, titre, description).subscribe(
          () => {
            this.loadKeyFactors();
            this.closeForm();
            this.toastrService.success('Key Factor updated successfully!', 'Success');
          },
          (error) => {
            console.error('Failed to update Key Factor:', error);
            this.toastrService.danger('Failed to update Key Factor.', 'Error');
          }
        );
      } else {
        this.keyFactorService.createKeyFactor(titre, description).subscribe(
          () => {
            this.loadKeyFactors();
            this.closeForm();
            this.toastrService.success('Key Factor created successfully!', 'Success');
          },
          (error) => {
            console.error('Failed to create Key Factor:', error);
            this.toastrService.danger('Failed to create Key Factor.', 'Error');
          }
        );
      }
    } else {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
    }
  }

  deleteKeyFactor(id: string): void {
    if (window.confirm('Are you sure you want to delete this Key Factor?')) {
      this.keyFactorService.deleteKeyFactor(id).subscribe(() => {
        this.loadKeyFactors();
        this.toastrService.success('Key Factor deleted successfully!', 'Success');
      });
    }
  }

  closeForm(): void {
    this.isFormVisible = false;
    this.keyFactorForm.reset();
    this.currentKeyFactor = null;
  }

  getAlertStatus(index: number): NbComponentStatus {
    switch (index % 6) {
      case 0: return 'primary';
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'danger';
      case 5: return 'basic';
      default: return 'basic';
    }
  }
}
