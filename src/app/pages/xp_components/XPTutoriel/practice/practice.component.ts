import { Component, OnInit } from '@angular/core';
import { PracticeService } from '../../../../core/services/xp_services/xp_tutoriel_services/practice.service';
import { Practice } from '../../../../core/models/xp_models/xp_tutoriel_model/Practice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  practices: Practice[] = [];
  addPracticeForm: FormGroup;
  editPracticeForm: FormGroup;

  isAddPracticeVisible: boolean = false;
  isEditPracticeVisible: boolean = false;

  constructor(
    private practiceService: PracticeService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService
  ) {
    this.addPracticeForm = this.formBuilder.group({
      name: ['', Validators.required],
      definition: ['', Validators.required],
      benefits: ['', Validators.required],
      challenges: ['', Validators.required]
    });

    this.editPracticeForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      definition: ['', Validators.required],
      benefits: ['', Validators.required],
      challenges: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPractices();
  }

  loadPractices(): void {
    this.practiceService.getAllPractices().subscribe((data: Practice[]) => {
      this.practices = data;
    });
  }

  openAddPracticeDialog(): void {
    this.isAddPracticeVisible = true;
  }

  closeAddPracticeDialog(): void {
    this.isAddPracticeVisible = false;
    this.addPracticeForm.reset();
  }

  saveNewPractice(): void {
    if (this.addPracticeForm.valid) {
      const newPractice: Practice = {
        name: this.addPracticeForm.value.name,
        definition: this.addPracticeForm.value.definition,
        benefits: this.addPracticeForm.value.benefits ? this.addPracticeForm.value.benefits.split(',') : [],
        challenges: this.addPracticeForm.value.challenges ? this.addPracticeForm.value.challenges.split(',') : [],
      };

      this.practiceService.createPractice(newPractice).subscribe((createdPractice: Practice) => {
        this.practices.push(createdPractice);
        this.closeAddPracticeDialog();
        this.toastrService.success('Practice created successfully', 'Success');
      }, (error) => {
        console.error('Failed to create practice:', error);
        this.toastrService.danger('Failed to create practice', 'Error');
      });
    }
  }

  openEditPracticeDialog(practice: Practice): void {
    this.editPracticeForm.patchValue({
      id: practice.id,
      name: practice.name,
      definition: practice.definition,
      benefits: practice.benefits.join(', '),
      challenges: practice.challenges.join(', ')
    });

    this.isEditPracticeVisible = true;
  }

  closeEditPracticeDialog(): void {
    this.isEditPracticeVisible = false;
    this.editPracticeForm.reset();
  }

  saveEditedPractice(): void {
    if (this.editPracticeForm.valid) {
      const editedPractice: Practice = {
        id: this.editPracticeForm.value.id,
        name: this.editPracticeForm.value.name,
        definition: this.editPracticeForm.value.definition,
        benefits: this.editPracticeForm.value.benefits ? this.editPracticeForm.value.benefits.split(',') : [],
        challenges: this.editPracticeForm.value.challenges ? this.editPracticeForm.value.challenges.split(',') : []
      };

      this.practiceService.updatePractice(editedPractice).subscribe(() => {
        this.loadPractices();
        this.closeEditPracticeDialog();
        this.toastrService.success('Practice updated successfully', 'Success');
      }, (error) => {
        console.error('Failed to update practice:', error);
        this.toastrService.danger('Failed to update practice', 'Error');
      });
    }
  }

  deletePractice(id: string): void {
    if (window.confirm('Are you sure you want to delete this practice?')) {
      this.practiceService.deletePractice(id).subscribe(() => {
        this.loadPractices();
        this.toastrService.success('Practice deleted successfully', 'Success');
      }, (error) => {
        console.error('Failed to delete practice:', error);
        this.toastrService.danger('Failed to delete practice', 'Error');
      });
    }
  }
}
