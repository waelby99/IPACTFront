import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Impact } from '../../../../core/models/xp_models/xp_tutoriel_model/Impact';
import { ImpactService } from '../../../../core/services/xp_services/xp_tutoriel_services/impact.service';

@Component({
  selector: 'ngx-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss']
})
export class ImpactComponent implements OnInit {
  impacts: Impact[] = [];
  currentImpact: Impact | null = null;
  impactForm: FormGroup;
  isFormVisible = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private impactService: ImpactService,
    private toastrService: NbToastrService
  ) {
    this.impactForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadImpacts();
  }

  loadImpacts(): void {
    this.impactService.getAllImpacts().subscribe(data => {
      this.impacts = data;
    });
  }

  addNewImpact(): void {
    this.currentImpact = null;
    this.impactForm.reset();
    this.selectedFile = null;
    this.isFormVisible = true;
  }

  openEditImpactDialog(impact: Impact): void {
    this.currentImpact = impact;
    this.impactForm.patchValue(impact);
    this.selectedFile = null;
    this.isFormVisible = true;
  }

  closeForm(): void {
    this.isFormVisible = false;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveImpact(): void {
    if (this.impactForm.invalid) {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
      return;
    }

    const newImpact: Impact = {
      id: this.currentImpact ? this.currentImpact.id : '',
      name: this.impactForm.value.name,
      description: this.impactForm.value.description,
    };

    const formData: FormData = new FormData();
    formData.append('name', newImpact.name);
    formData.append('description', newImpact.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.currentImpact) {
      if (window.confirm('Do you want to edit this impact?')) {
        this.impactService.updateImpact(newImpact.id, newImpact.name, newImpact.description, this.selectedFile).subscribe(
          () => {
            this.loadImpacts();
            this.closeForm();
            this.toastrService.success('Impact updated successfully', 'Success');
          },
          (error) => {
            console.error('Failed to update impact:', error);
            this.toastrService.danger('Failed to update impact', 'Error');
          }
        );
      }
    } else {
      this.impactService.createImpact(newImpact.name, newImpact.description, this.selectedFile).subscribe(
        () => {
          this.loadImpacts();
          this.closeForm();
          this.toastrService.success('Impact created successfully', 'Success');
        },
        (error) => {
          console.error('Failed to create impact:', error);
          this.toastrService.danger('Failed to create impact', 'Error');
        }
      );
    }
  }

  deleteImpact(id: string): void {
    if (window.confirm('Do you want to delete this impact?')) {
      this.impactService.deleteImpact(id).subscribe(
        () => {
          this.loadImpacts();
          this.toastrService.success('Impact deleted successfully', 'Success');
        },
        (error) => {
          console.error('Failed to delete impact:', error);
          this.toastrService.danger('Failed to delete impact', 'Error');
        }
      );
    }
  }

  getImageUrl(relativePath: string): string {
    if (relativePath) {
      return `http://localhost:8085/ManajeroBackend${relativePath}`;
    }
    return '';
  }
}
