import { Iteration } from "./Iteration";
import { Task } from "./Task"; 
import { UserStoryPriority } from "./UserStoryPriority.enum";
import { UserStoryStatus } from "./UserStoryStatus.enum";

export interface UserStory {
    id?: string;
    title: string;
    description: string;
    status: UserStoryStatus; // Example: 'TO_DO', 'IN_PROGRESS', 'DONE'
    priority: UserStoryPriority;
    iterationId?: string;  // Reference to Iteration ID
    tasks?: Task[];
  }
  