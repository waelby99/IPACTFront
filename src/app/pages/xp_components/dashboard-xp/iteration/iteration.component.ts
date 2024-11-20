import { Component, OnInit } from '@angular/core';
import { IterationService } from '../../../../core/services/xp_services/iteration.service';
import { Iteration } from '../../../../core/models/xp_models/Iteration';

@Component({
  selector: 'ngx-iteration',
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.scss']
})
export class IterationComponent implements OnInit {
  iterations: Iteration[] = [];
  selectedIteration: Iteration | null = null;
  newIteration: Iteration = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };
  updateIteration: Iteration | null = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };
  showDialog: boolean = false;
  updateDialog: boolean = false;
  isAddingIteration: boolean = false;
  isUpdatingIteration: boolean = false;

  // For alerts
  alertMessage: string = '';
  alertStatus: string = '';
  showAlert: boolean = false;

  constructor(
    private iterationService: IterationService
  ) {}

  ngOnInit(): void {
    this.loadIterations();
  }

  loadIterations(): void {
    this.iterationService.getAllIterations().subscribe(data => {
      this.iterations = data;
    });
  }

  toggleUserStories(iteration: Iteration): void {
    if (iteration.showUserStories) {
      iteration.showUserStories = false;
    } else {
      iteration.loading = true;
      this.iterationService.getUserStoriesOfIteration(iteration.id!).subscribe(userStories => {
        iteration.userStories = userStories;
        iteration.showUserStories = true;
        iteration.loading = false;
      });
    }
  }

  viewIteration(iteration: Iteration): void {
    this.selectedIteration = iteration;
    this.showDialog = true;
    this.isAddingIteration = false;
    this.isUpdatingIteration = false;
  }

  openAddIterationDialog(): void {
    this.showDialog = true;
    this.isAddingIteration = true;
  }

  openUpdateIterationDialog(iteration: Iteration): void {
    this.updateIteration = iteration;
    this.updateDialog = true;
  }

  addIteration(): void {
    this.iterationService.addIteration(this.newIteration).subscribe(() => {
      this.loadIterations();
      this.newIteration = { title: '', description: '', startDate: new Date(), endDate: new Date() };
      this.showAlertMessage('success', 'Iteration added successfully!');
      this.closeDialog();
    }, error => {
      this.showAlertMessage('danger', 'Error adding iteration!');
    });
  }

  updateIterations(): void {
    if (this.updateIteration) {
      this.iterationService.updateIteration(this.updateIteration.id!, this.updateIteration).subscribe(() => {
        this.loadIterations();
        this.updateIteration = null;
        this.showAlertMessage('success', 'Iteration updated successfully!');
        this.closeUpdateDialog();
      }, error => {
        this.showAlertMessage('danger', 'Error updating iteration!');
      });
    }
  }

  deleteIteration(id: string): void {
    if (window.confirm('Are you sure you want to delete this iteration?')) {
      this.iterationService.deleteIteration(id).subscribe(() => {
        this.showAlertMessage('success', 'Iteration deleted successfully!');
        this.loadIterations();
      }, error => {
        this.showAlertMessage('danger', 'Error deleting iteration!');
      });
    }
  }

  showAlertMessage(status: string, message: string): void {
    this.alertStatus = status;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000); // Hide the alert after 5 seconds
  }

  closeDialog(): void {
    this.showDialog = false;
    this.selectedIteration = null;
  }

  closeUpdateDialog(): void {
    this.updateDialog = false;
    this.updateIteration = null;
  }
}
