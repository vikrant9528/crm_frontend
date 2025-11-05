import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-lead-pipeline',
  templateUrl: './lead-pipeline.component.html'
})
export class LeadPipelineComponent {
  stages = [
    { key: 'new', label: 'New', leads: [{ name: 'John Doe', email: 'john@test.com' }] },
    { key: 'contacted', label: 'Contacted', leads: [{ name: 'Jane Smith', email: 'jane@test.com' }] },
    { key: 'qualified', label: 'Qualified', leads: [] },
    { key: 'closed', label: 'Closed', leads: [] }
  ];
  connectedDropLists = this.stages.map(s => s.key);

  drop(event: CdkDragDrop<any[]>, stageKey: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const lead = event.container.data[event.currentIndex];
      console.log(`Lead ${lead.name} moved to stage: ${stageKey}`);
    }
  }
}
