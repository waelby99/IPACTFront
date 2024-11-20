
import { BugStatus } from './bug-status.enum';

export interface Bug {
  id?: string;
  title: string;
  description: string;
  status: BugStatus;
  progress: number;
  TaskId?: string;  // Reference to Iteration ID

}
