import { Component, OnInit, TemplateRef } from '@angular/core';
import { LimitationService } from '../../../../core/services/xp_services/xp_tutoriel_services/limitation.service';
import { Limitation } from '../../../../core/models/xp_models/xp_tutoriel_model/Limitation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-limitation',
  templateUrl: './limitation.component.html',
  styleUrls: ['./limitation.component.scss']
})
export class LimitationComponent implements OnInit {
  limitations: Limitation[] = [];
  addLimitationForm: FormGroup;
  editLimitationForm: FormGroup;
  selectedFile: File | null = null;
  editImageUrl: string | null = null;
  isAddFormVisible: boolean = false;
  isEditFormVisible: boolean = false;

  constructor(
    private limitationService: LimitationService,
    private fb: FormBuilder,
    private toastrService: NbToastrService
  ) {
    this.addLimitationForm = this.fb.group({
      description: ['', Validators.required],
      file: [null]
    });

    this.editLimitationForm = this.fb.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      file: [null]
    });
  }

  ngOnInit() {
    this.loadLimitations();
  }

  loadLimitations() {
    this.limitationService.getAllLimitations().subscribe((data: Limitation[]) => {
      this.limitations = data;
    });
  }

  openAddLimitationForm() {
    this.isAddFormVisible = true;
  }

  openEditLimitationForm(limitation: Limitation) {
    if (window.confirm('Do you really want to edit this limitation?')) {
      this.editLimitationForm.patchValue({
        id: limitation.id,
        description: limitation.description
      });
      this.editImageUrl = this.getLimitationImageUrl(limitation);
      this.isEditFormVisible = true;
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  saveNewLimitation() {
    if (this.addLimitationForm.valid) {
      const { description } = this.addLimitationForm.value;
      if (this.selectedFile) {
        this.limitationService.createLimitation(description, this.selectedFile).subscribe((newLimitation: Limitation) => {
          this.limitations.push(newLimitation);
          this.addLimitationForm.reset();
          this.selectedFile = null;
          this.isAddFormVisible = false;
          this.toastrService.success('Limitation added successfully!', 'Success');
        });
      }
    } else {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
    }
  }

  saveEditedLimitation() {
    if (this.editLimitationForm.valid) {
      const { id, description } = this.editLimitationForm.value;
      if (id) {
        const formData = new FormData();
        formData.append('description', description);
        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }

        this.limitationService.updateLimitation(id, formData).subscribe((updatedLimitation: Limitation) => {
          const index = this.limitations.findIndex(l => l.id === updatedLimitation.id);
          if (index !== -1) {
            this.limitations[index] = updatedLimitation;
          }
          this.editLimitationForm.reset();
          this.selectedFile = null;
          this.editImageUrl = null;
          this.isEditFormVisible = false;
          this.toastrService.success('Limitation updated successfully!', 'Success');
        });
      }
    } else {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
    }
  }

  deleteLimitation(id: string) {
    if (window.confirm('Are you sure you want to delete this limitation?')) {
      this.limitationService.deleteLimitation(id).subscribe(() => {
        this.limitations = this.limitations.filter(l => l.id !== id);
        this.toastrService.success('Limitation deleted successfully!', 'Success');
      });
    }
  }

  getLimitationImageUrl(limitation: Limitation): string {
    // Assuming your backend serves static files from 'http://localhost:8090/'
    return `http://localhost:8085/ManajeroBackend${limitation.imageUrl}`;
  }

  closeForm() {
    this.isAddFormVisible = false;
    this.isEditFormVisible = false;
    this.addLimitationForm.reset();
    this.editLimitationForm.reset();
    this.selectedFile = null;
    this.editImageUrl = null;
  }
}
