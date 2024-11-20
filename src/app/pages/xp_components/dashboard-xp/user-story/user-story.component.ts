import { Component, OnInit } from '@angular/core';
import { UserStoryService } from '../../../../core/services/xp_services/user-story.service';
import { IterationService } from '../../../../core/services/xp_services/iteration.service';
import { TaskService } from '../../../../core/services/xp_services/task.service';
import { UserStory } from '../../../../core/models/xp_models/UserStory';
import { Task } from '../../../../core/models/xp_models/Task';
import { Iteration } from '../../../../core/models/xp_models/Iteration';
import { UserStoryStatus } from '../../../../core/models/xp_models/UserStoryStatus.enum';
import { UserStoryPriority } from '../../../../core/models/xp_models/UserStoryPriority.enum';

@Component({
  selector: 'ngx-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.scss']
})
export class UserStoryComponent implements OnInit {
  userStories: UserStory[] = [];
  iterations: Iteration[] = [];
  tasks: Task[] = [];
  selectedTasks: string[] = [];
  selectedUserStory: UserStory | null = null;
  editingUserStory: UserStory = { title: '', description: '', status: UserStoryStatus.TO_DO, priority: UserStoryPriority.HIGH } as UserStory;
  newUserStory: UserStory = { title: '', description: '', status: UserStoryStatus.TO_DO, priority: UserStoryPriority.HIGH } as UserStory;
  userStoryIteration: Iteration | null = null;
  userStoryTasks: Task[] = [];
  showDialog: boolean = false;
  showSidebar: boolean = false; // Toggle for sidebar
  isAddingIteration: boolean = false;
  selectedIterationId: string | null = null;
  currentTab: string = 'TO_DO';
  UserStoryStatus = UserStoryStatus;
  UserStoryPriority = UserStoryPriority;

  constructor(
    private userStoryService: UserStoryService,
    private iterationService: IterationService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadUserStories();
    this.loadIterations();
    this.loadTasks();
  }

  loadUserStories(): void {
    this.userStoryService.getAllUserStories().subscribe(userStories => {
      this.userStories = userStories;
    });
  }

  loadIterations(): void {
    this.iterationService.getAllIterations().subscribe(iterations => {
      this.iterations = iterations;
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  loadUserStoryTasks(userStoryId: string): void {
    this.userStoryService.getTasksOfUserStory(userStoryId).subscribe(tasks => {
      this.userStoryTasks = tasks;
    });
  }

  showAddDialog(): void {
    this.showDialog = true;
    this.isAddingIteration = true;
  }

  showEditDialog(userStory: UserStory): void {
    this.editingUserStory = { ...userStory };
    this.showDialog = true;
    this.isAddingIteration = false;
  }

  showDetailsSidebar(userStory: UserStory): void {
    this.selectedUserStory = userStory;
    this.fetchIterationTitle(userStory);
    this.loadUserStoryTasks(userStory.id!);
    this.showSidebar = true;
  }

  closeSidebar(): void {
    this.showSidebar = false;
    this.selectedUserStory = null;
  }

  fetchIterationTitle(userStory: UserStory): void {
    this.userStoryService.getIterationOfUserStory(userStory.id!).subscribe(
      (iteration: Iteration) => {
        this.userStoryIteration = iteration;
      },
      (error) => {
        console.error('Error fetching user story details', error);
      }
    );
  }

  closeDialog(): void {
    this.showDialog = false;
    this.isAddingIteration = false;
    this.selectedUserStory = null;
    this.editingUserStory = { title: '', description: '', status: UserStoryStatus.TO_DO, priority: UserStoryPriority.HIGH } as UserStory;
    this.userStoryIteration = null;
    this.userStoryTasks = [];
    this.selectedTasks = [];
  }

  addUserStory(): void {
    if (this.selectedIterationId) {
      this.userStoryService.createUserStory(this.newUserStory)
        .subscribe(() => {
          this.closeDialog();
          this.loadUserStories();
        });
    } else {
      this.userStoryService.createUserStory(this.newUserStory)
        .subscribe(() => {
          this.closeDialog();
          this.loadUserStories();
        });
    }
  }

  updateUserStory(): void {
    if (window.confirm('Are you sure you want to update this user story?')) {
      if (this.editingUserStory.id) {
        this.userStoryService.updateUserStory(this.editingUserStory).subscribe(() => {
          this.closeDialog();
          this.loadUserStories();
        });
      }
    }
  }
  updateUserStory2(): void {
    if (window.confirm('Are you sure you want to update this user story?')) {
      if (this.editingUserStory.id) {
        this.userStoryService.updateUserStory2(this.editingUserStory, this.selectedIterationId)
          .subscribe(() => {
            this.closeDialog();
            this.loadUserStories();
          });
      }
    }
  }


  deleteUserStory(id: string): void {
    if (window.confirm('Are you sure you want to delete this user story?')) {
      this.userStoryService.deleteUserStory(id).subscribe(() => {
        this.loadUserStories();
      });
    }
  }

  onIterationChange(iterationId: string): void {
    this.selectedIterationId = iterationId;
  }

  setCurrentTab(status: string): void {
    this.currentTab = status;
  }

  getPriorityColor(priority: UserStoryPriority): string {
    switch (priority) {
      case UserStoryPriority.HIGH:
        return '#ffcccc'; // Light red for high priority
      case UserStoryPriority.MEDIUM:
        return '#ffe5b4'; // Light orange for medium priority
      case UserStoryPriority.LOW:
        return '#d4edda'; // Light green for low priority
      default:
        return '#d3d3d3'; // Light gray for default
    }
  }
}
