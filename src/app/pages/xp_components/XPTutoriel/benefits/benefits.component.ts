import { Component, OnInit } from '@angular/core';
import { BenefitService } from '../../../../core/services/xp_services/xp_tutoriel_services/benefit.service';
import { Benefit } from '../../../../core/models/xp_models/xp_tutoriel_model/Benefit';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {
  benefits: Benefit[] = [];
  addBenefitForm: FormGroup;
  editBenefitForm: FormGroup;
  selectedFile: File | null = null;
  isAddBenefitCardVisible: boolean = false;
  isEditBenefitCardVisible: boolean = false;
  editImageUrl: string | null = null;

  constructor(
    private benefitService: BenefitService,
    private fb: FormBuilder,
    private toastrService: NbToastrService
  ) {
    this.addBenefitForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      file: [null]
    });

    this.editBenefitForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      file: [null]
    });
  }

  ngOnInit() {
    this.loadBenefits();
  }

  loadBenefits() {
    this.benefitService.getAllBenefits().subscribe((data: Benefit[]) => {
      this.benefits = data;
    });
  }

  openAddBenefitForm() {
    this.isAddBenefitCardVisible = true;
  }

  openEditBenefitForm(benefit: Benefit) {
    this.editBenefitForm.patchValue({
      id: benefit.id,
      name: benefit.name,
      description: benefit.description
    });
    this.editImageUrl = this.getBenefitImageUrl(benefit);
    this.isEditBenefitCardVisible = true;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  saveNewBenefit() {
    if (this.addBenefitForm.valid) {
      const { name, description } = this.addBenefitForm.value;
      if (this.selectedFile) {
        this.benefitService.createBenefit(name, description, this.selectedFile).subscribe((newBenefit: Benefit) => {
          this.benefits.push(newBenefit);
          this.addBenefitForm.reset();
          this.selectedFile = null;
          this.isAddBenefitCardVisible = false;
          this.toastrService.success('Benefit added successfully!', 'Success');
        });
      }
    } else {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
    }
  }

  saveEditedBenefit() {
    if (this.editBenefitForm.valid) {
      const { id, name, description } = this.editBenefitForm.value;
      if (window.confirm('Are you sure you want to save these changes?')) {
        this.benefitService.updateBenefit(id, name, description, this.selectedFile).subscribe((updatedBenefit: Benefit) => {
          const index = this.benefits.findIndex(b => b.id === updatedBenefit.id);
          if (index !== -1) {
            this.benefits[index] = updatedBenefit;
          }
          this.editBenefitForm.reset();
          this.selectedFile = null;
          this.editImageUrl = null;
          this.isEditBenefitCardVisible = false;
          this.toastrService.success('Benefit updated successfully!', 'Success');
        });
      }
    } else {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
    }
  }

  deleteBenefit(id: string) {
    if (window.confirm('Are you sure you want to delete this benefit?')) {
      this.benefitService.deleteBenefit(id).subscribe(() => {
        this.benefits = this.benefits.filter(b => b.id !== id);
        this.toastrService.success('Benefit deleted successfully!', 'Success');
      });
    }
  }

  getBenefitImageUrl(benefit: Benefit): string {
    return `http://localhost:8085/ManajeroBackend${benefit.imageUrl}`;
  }

  closeAddBenefitCard() {
    this.isAddBenefitCardVisible = false;
  }

  closeEditBenefitCard() {
    this.isEditBenefitCardVisible = false;
  }
}
