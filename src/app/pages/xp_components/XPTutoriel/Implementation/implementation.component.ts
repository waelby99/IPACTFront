import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Implementation } from '../../../../core/models/xp_models/xp_tutoriel_model/Implementation';
import { ImplementationService } from '../../../../core/services/xp_services/xp_tutoriel_services/implementation.service';

@Component({
  selector: 'ngx-implementation',
  templateUrl: './implementation.component.html',
  styleUrls: ['./implementation.component.scss']
})
export class ImplementationComponent implements OnInit {
  implementations: Implementation[] = [];
  currentImplementation: Implementation | null = null;
  implementationForm: FormGroup;
  isFormVisible: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private implementationService: ImplementationService,
    private toastrService: NbToastrService
  ) {
    this.implementationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadImplementations();
  }

  loadImplementations(): void {
    this.implementationService.getAllImplementations().subscribe(data => {
      this.implementations = data;
    });
  }

  openAddImplementationForm(): void {
    this.currentImplementation = null;
    this.implementationForm.reset();
    this.selectedFile = null;
    this.isFormVisible = true;
  }

  openEditImplementationForm(implementation: Implementation): void {
    this.currentImplementation = implementation;
    this.implementationForm.patchValue(implementation);
    this.selectedFile = null;
    this.isFormVisible = true;
  }

  saveImplementation(): void {
    if (this.implementationForm.invalid) {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
      return;
    }

    const { name, description } = this.implementationForm.value;
    const file = this.selectedFile;

    if (this.currentImplementation) {
      this.implementationService.updateImplementation(this.currentImplementation.id, name, description, file).subscribe(
        () => {
          this.loadImplementations();
          this.closeForm();
          this.toastrService.success('Implementation updated successfully', 'Success');
        },
        (error) => {
          this.toastrService.danger('Failed to update implementation', 'Error');
        }
      );
    } else {
      this.implementationService.createImplementation(name, description, file).subscribe(
        () => {
          this.loadImplementations();
          this.closeForm();
          this.toastrService.success('Implementation created successfully', 'Success');
        },
        (error) => {
          this.toastrService.danger('Failed to create implementation', 'Error');
        }
      );
    }
  }

  deleteImplementation(id: string): void {
    if (window.confirm('Do you want to delete this implementation?')) {
      this.implementationService.deleteImplementation(id).subscribe(
        () => {
          this.loadImplementations();
          this.toastrService.success('Implementation deleted successfully', 'Success');
        },
        (error) => {
          this.toastrService.danger('Failed to delete implementation', 'Error');
        }
      );
    }
  }

  closeForm(): void {
    this.isFormVisible = false;
    this.implementationForm.reset();
    this.selectedFile = null;
    this.currentImplementation = null;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  getImageUrl(relativePath: string): string {
    if (relativePath) {
      return `http://localhost:8085/ManajeroBackend${relativePath}`;
    }
    return '';
  }
}
