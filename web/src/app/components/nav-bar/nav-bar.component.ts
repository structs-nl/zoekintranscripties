import { Component, Input } from '@angular/core';
import { IInventory } from 'src/app/services/transcription.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  @Input()
  document?: IInventory;
}
