import { Pipe, PipeTransform } from '@angular/core';
import { UserStoryStatus } from '../../../../core/models/xp_models/UserStoryStatus.enum'; // Adjust the import path accordingly

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {
  transform(userStories: any[], status: UserStoryStatus): any[] {
    if (!userStories || !status) {
      return userStories;
    }
    return userStories.filter(userStory => userStory.status === status);
  }
}
