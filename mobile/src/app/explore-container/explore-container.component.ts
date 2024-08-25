import { Component, Input } from '@angular/core';

@Component({
  selector: 'cn-billing-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @Input() name?: string;
}
