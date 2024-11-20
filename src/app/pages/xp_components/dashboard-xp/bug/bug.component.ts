import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { BugService } from '../../../../core/services/xp_services/bug.service';
import { TaskService } from '../../../../core/services/xp_services/task.service';
import { Bug } from '../../../../core/models/xp_models/Bug';
import { BugStatus } from '../../../../core/models/xp_models/bug-status.enum';
import { Task } from '../../../../core/models/xp_models/Task'; // Assuming you have a Task model

@Component({
  selector: 'ngx-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {
  bugs: Bug[] = [];
  newBug: Bug = { title: '', description: '', status: BugStatus.OPEN, progress: 0 };
  selectedBug: Bug | null = null;
  selectedBugForUpdate: Bug | null = null;
  tasks: Task[] = []; // Replace 'Task' with actual Task model if available
  selectedTaskId: string = '';
  showAddBugForm = false;
  showUpdateBugForm = false;
  showBugSidebar = false;
  selectedBugTask: Task | null = null;

  constructor(
    private bugService: BugService,
    private taskService: TaskService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loadBugs();
    this.loadTasks();
  }

  loadBugs() {
    this.bugService.getAllBugs().subscribe(
      (data) => {
        this.bugs = data;
      },
      (error) => {
        console.error('Error loading bugs', error);
      }
    );
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  addBugAndAssignBugToTask() {
    if (this.selectedTaskId) {
      this.bugService.addBugAndAssignBugToTask(this.newBug, this.selectedTaskId).subscribe(
        (bug) => {
          this.bugs.push(bug);
          this.newBug = { id: '', title: '', description: '', status: BugStatus.OPEN, progress: 0 };
          this.selectedTaskId = ''; // Reset the selected task
        },
        (error) => {
          console.error('Error adding and assigning bug', error);
        }
      );
    } else {
      console.warn('No task selected');
    }
  }

  deleteBug(id: string) {
    this.bugService.deleteBug(id).subscribe(
      () => {
        this.bugs = this.bugs.filter(bug => bug.id !== id);
        this.toastrService.show('Bug deleted successfully', 'Success', { status: 'success' });
      },
      (error) => {
        console.error('Error deleting bug', error);
        this.toastrService.show('Failed to delete bug', 'Error', { status: 'danger' });
      }
    );
  }

  selectBugForUpdate(bug: Bug) {
    this.selectedBugForUpdate = { ...bug };
    this.showUpdateBugForm = true;
  }

  updateBug() {
    if (this.selectedBugForUpdate) {
      this.bugService.updateBug(this.selectedBugForUpdate).subscribe(
        (updatedBug) => {
          const index = this.bugs.findIndex(bug => bug.id === updatedBug.id);
          if (index !== -1) {
            this.bugs[index] = updatedBug;
          }
          this.toastrService.show('Bug updated successfully', 'Success', { status: 'success' });
          this.selectedBugForUpdate = null;
          this.showUpdateBugForm = false; // Hide the update form
        },
        (error) => {
          console.error('Error updating bug', error);
          this.toastrService.show('Failed to update bug', 'Error', { status: 'danger' });
        }
      );
    }
  }

  cancelUpdate() {
    this.selectedBugForUpdate = null;
    this.showUpdateBugForm = false; // Hide the update form
  }

  selectBug(bug: Bug) {
    this.selectedBug = bug;
    this.showBugSidebar = true;
    this.loadTaskForBug({ bugId: bug.id }); // Load associated task
  }

  loadTaskForBug({ bugId }: { bugId: string; }): void {
    this.bugService.getTaskForBug(bugId).subscribe(
      (response) => { // Ensure task is of type Task
        console.log('API Response:'); // Log the task for verification
        this.selectedBugTask = response as unknown as Task; // Assign directly without casting
      },
      (error) => {
        console.error('Error loading task for bug', error);
      }
    );
  }
  
 
  closeBugSidebar() {
    this.selectedBug = null;
    this.showBugSidebar = false;
    this.selectedBugTask = null; // Clear the selected task when closing the sidebar
  }

  showAlert(bug: Bug) {
    this.toastrService.show(bug.description, bug.title, { status: 'info' });
  }

  getStatusColor(status: BugStatus): string {
    switch (status) {
      case BugStatus.OPEN: return 'status-open';
      case BugStatus.IN_PROGRESS: return 'status-in-progress';
      case BugStatus.CLOSED: return 'status-closed';
      default: return 'status-default';
    }
  }

  cancelAddBug() {
    this.newBug = { title: '', description: '', status: BugStatus.OPEN, progress: 0 };
    this.selectedTaskId = '';
    this.showAddBugForm = false; // Hide the add form
  }

  openAddBugForm() {
    this.showAddBugForm = true; // Show the add form
  }
}
