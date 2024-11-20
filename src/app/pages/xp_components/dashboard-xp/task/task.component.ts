import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/xp_services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../../core/models/xp_models/Task';
import { UserStory } from '../../../../core/models/xp_models/UserStory';
import { UserStoryService } from '../../../../core/services/xp_services/user-story.service';
import { Bug } from '../../../../core/models/xp_models/Bug';

@Component({
  selector: 'ngx-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  currentTab = 'TO_DO';
  showAddTaskDialog = false;
  showEditTaskDialog = false;
  tasks: Task[] = [];
  userStories: UserStory[] = [];
  selectedTask: Task | null = null;
  selectedUserStoryId: string = '';
  newTask: Task = { title: '', description: '', status: 'TO_DO', progress: 0 };
  userStoryTitle: string;
  isEditMode = false;
  showSidebar: boolean = false;
  bugs: Bug[] = [];

  constructor(
    private taskService: TaskService,
    private userStoryService: UserStoryService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadUserStories();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  loadUserStories() {
    this.userStoryService.getAllUserStories().subscribe(userStories => {
      this.userStories = userStories;
    });
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  getTasksByStatus(status: string) {
    return this.tasks.filter(task => task.status === status);
  }

  openAddTaskDialog() {
    this.showAddTaskDialog = true;
    this.newTask = { title: '', description: '', status: 'TO_DO', progress: 0 };
  }

  openEditTaskDialog(task: Task) {
    this.selectedTask = { ...task };
    this.selectedUserStoryId = task.userStoryId;
    this.showEditTaskDialog = true;
  }

  createTask() {
    if (this.selectedUserStoryId) {
      this.taskService.addTaskAndAssignTaskToUserStory(this.selectedUserStoryId, this.newTask).subscribe(() => {
        this.loadTasks();
        this.showAddTaskDialog = false;
      });
    } else {
      this.taskService.addTask(this.newTask).subscribe(() => {
        this.loadTasks();
        this.showAddTaskDialog = false;
      });
    }
  }

  updateTask() {
    if (this.selectedTask) {
      if (window.confirm('Are you sure you want to update this task?')) {
        this.taskService.updateTask(this.selectedTask).subscribe(() => {
          this.loadTasks();
          this.showEditTaskDialog = false;
          this.selectedTask = null;
        });
      }
    }
  }
 
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteTask(taskId: string) {
    if (window.confirm('Are you sure you want to delete this Task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  setTaskProgress(task: Task, newValue: number) {
    task.progress = Math.min(Math.max(newValue, 0), 100);
  }

  getProgressStatus(task: Task) {
    if (task.progress <= 25) {
      return 'danger';
    } else if (task.progress <= 50) {
      return 'warning';
    } else if (task.progress <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }

  onSelectTask(task: Task): void {
    this.selectedTask = task;
    this.fetchUserStoryTitle(task.id);
  }

  fetchUserStoryTitle(taskId: string): void {
    this.taskService.getUserStoryOfTask(taskId).subscribe(
      (userStory: UserStory) => {
        this.userStoryTitle = userStory.title;
      },
      (error) => {
        console.error('Error fetching user story details', error);
      }
    );
  }
  fetchBugsForTask(taskId: string): void {
    this.taskService.getBugsByTaskId(taskId).subscribe(
      (bugs: Bug[]) => {
        this.bugs = bugs;
      },
      (error) => {
        console.error('Error fetching bugs', error);
      }
    );
  }
  showDetailsSidebar(task: Task): void {
    this.selectedTask = task;
    this.fetchUserStoryTitle(task.id);
    this.fetchBugsForTask(task.id);  // Fetch bugs for the selected task
    this.showSidebar = true;
  }

  closeSidebar(): void {
    this.showSidebar = false;
  }
}
