import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Definition } from '../../../../core/models/xp_models/xp_tutoriel_model/definition';
import { DefinitionService } from '../../../../core/services/xp_services/xp_tutoriel_services/definition.service';

@Component({
  selector: 'ngx-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.scss']
})
export class DefinitionsComponent implements OnInit {
  definitions: Definition[] = [];
  editForm: FormGroup;
  addForm: FormGroup;
  editingDefinition: Definition;

  showAddForm = false;
  showEditForm = false;

  constructor(
    private definitionService: DefinitionService,
    private fb: FormBuilder,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loadDefinitions();
    this.editForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.addForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  loadDefinitions(): void {
    this.definitionService.getDefinitions()
      .subscribe((definitions) => {
        this.definitions = definitions;
      });
  }

  openEditForm(definition: Definition): void {
    if (window.confirm('Are you sure you want to edit this definition?')) {
      this.editingDefinition = { ...definition };
      this.editForm.patchValue(this.editingDefinition);
      this.showEditForm = true;
    }
  }

  saveEditedDefinition(): void {
    if (this.editForm.valid) {
      this.definitionService.updateDefinition(this.editingDefinition.id, this.editForm.value)
        .subscribe(() => {
          this.loadDefinitions();
          this.closeDialog();
          this.toastrService.success('Definition updated successfully!', 'Success');
        });
    } else {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
    }
  }

  openAddForm(): void {
    this.addForm.reset();
    this.showAddForm = true;
  }

  saveNewDefinition(): void {
    if (this.addForm.valid) {
      this.definitionService.createDefinition(this.addForm.value)
        .subscribe(() => {
          this.loadDefinitions();
          this.closeDialog();
          this.toastrService.success('Definition added successfully!', 'Success');
        });
    } else {
      this.toastrService.warning('Please fill in all required fields.', 'Warning');
    }
  }

  closeDialog(): void {
    this.showAddForm = false;
    this.showEditForm = false;
    this.editingDefinition = null;
    this.editForm.reset();
    this.addForm.reset();
  }

  deleteDefinition(id: string): void {
    if (window.confirm('Are you sure you want to delete this definition?')) {
      this.definitionService.deleteDefinition(id)
        .subscribe(() => {
          this.loadDefinitions();
          this.toastrService.success('Definition deleted successfully!', 'Success');
        });
    }
  }
}
