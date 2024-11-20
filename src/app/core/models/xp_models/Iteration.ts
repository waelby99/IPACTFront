import { UserStory } from './UserStory';

export interface Iteration {
  id?: string;
  title : string;
  description: string;
  startDate: Date;
  endDate: Date;
  showUserStories?: boolean; // Add this flag
  userStories?: UserStory[]; // Add this to hold the user stories
  loading?: boolean ;  // Add this
  projectId?: string;  // Reference to Iteration ID

}
