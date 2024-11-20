import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbDialogRef, NbToastrService } from '@nebular/theme';
import {  DiagramService } from '../../../../core/services/xp_services/xp_tutoriel_services/diagram.service';
import { Diagram } from '../../../../core/models/xp_models/xp_tutoriel_model/Diagram';


@Component({
  selector: 'ngx-digrams',
  templateUrl: './digrams.component.html',
  styleUrls: ['./digrams.component.scss']
})
export class DigramsComponent  implements OnInit {
    diagrams: Diagram[] = [];
    addDiagramForm: FormGroup;
    editDiagramForm: FormGroup;
    selectedFile: File | null = null;
    isAddDialogOpen = false;
    isEditDialogOpen = false;
    editImageUrl: string | null = null;
  
    constructor(
      private diagramService: DiagramService,
      private fb: FormBuilder,
      private toastrService: NbToastrService
    ) {
      this.addDiagramForm = this.fb.group({
        name: ['', Validators.required],
        file: [null]
      });
  
      this.editDiagramForm = this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        file: [null]
      });
    }
  
    ngOnInit() {
      this.loadDiagrams();
    }
  
    loadDiagrams() {
      this.diagramService.getDiagrams().subscribe((data: Diagram[]) => {
        this.diagrams = data;
      });
    }
  
    openAddDiagramForm() {
      this.isAddDialogOpen = true;
    }
  
    openEditDiagramForm(diagram: Diagram) {
      if (window.confirm('Do you really want to edit this diagram?')) {
        this.editDiagramForm.patchValue({
          id: diagram.id,
          name: diagram.name
        });
        this.editImageUrl = this.getDiagramImageUrl(diagram);
        this.isEditDialogOpen = true;
      }
    }
  
    onFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
      }
    }
  
    saveNewDiagram() {
      if (this.addDiagramForm.valid) {
        const { name } = this.addDiagramForm.value;
        if (this.selectedFile) {
          this.diagramService.createDiagram(name, this.selectedFile).subscribe((newDiagram: Diagram) => {
            this.diagrams.push(newDiagram);
            this.addDiagramForm.reset();
            this.selectedFile = null;
            this.isAddDialogOpen = false;
            this.toastrService.success('Diagram added successfully!', 'Success');
          });
        }
      } else {
        this.toastrService.warning('Please fill in all required fields.', 'Warning');
      }
    }
  
    saveEditedDiagram() {
      if (this.editDiagramForm.valid) {
        const { id, name } = this.editDiagramForm.value;
        if (id) {
          const formData = new FormData();
          formData.append('name', name);
          if (this.selectedFile) {
            formData.append('file', this.selectedFile);
          }
  
          this.diagramService.updateDiagram(id, formData).subscribe((updatedDiagram: Diagram) => {
            const index = this.diagrams.findIndex(d => d.id === updatedDiagram.id);
            if (index !== -1) {
              this.diagrams[index] = updatedDiagram;
            }
            this.editDiagramForm.reset();
            this.selectedFile = null;
            this.editImageUrl = null;
            this.isEditDialogOpen = false;
            this.toastrService.success('Diagram updated successfully!', 'Success');
          });
        }
      } else {
        this.toastrService.warning('Please fill in all required fields.', 'Warning');
      }
    }
  
    deleteDiagram(id: string) {
      if (window.confirm('Are you sure you want to delete this diagram?')) {
        this.diagramService.deleteDiagram(id).subscribe(() => {
          this.diagrams = this.diagrams.filter(d => d.id !== id);
          this.toastrService.success('Diagram deleted successfully!', 'Success');
        });
      }
    }
  
    getDiagramImageUrl(diagram: Diagram): string {
      return `http://localhost:8085/ManajeroBackend${diagram.imageUrl}`;
    }
  
    closeDialog() {
      this.isAddDialogOpen = false;
      this.isEditDialogOpen = false;
    }
  }
  