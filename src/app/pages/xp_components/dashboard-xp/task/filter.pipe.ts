import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus  } from '../../../../core/models/xp_models/task-status.enum'; // Adjust the import path accordingly

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(tasks: any[], status: TaskStatus): any[] {
    if (!tasks || !status) {
      return tasks;
    }
    return tasks.filter(item => item.status === status);
  }
 
}
