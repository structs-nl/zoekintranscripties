import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css'],
})
export class CollapseComponent {
  @Input() label?: string;
}
