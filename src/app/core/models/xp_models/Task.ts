
import  { UserStory } from  "./UserStory"  
import  { Bug } from  "./Bug"  
import { User } from './User';
import { TaskStatus } from './task-status.enum';
  
export interface Task {
    id?: string ;
    title: string ;
    status: string ;
    progress: number ;
    description?: string ;
    userStoryId?: string ;  // Reference to Iteration ID
    bugs?: Bug[]; // Array of Bug objects
    
    }