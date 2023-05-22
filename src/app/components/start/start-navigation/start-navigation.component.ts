import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-start-navigation',
  standalone: true,
  imports: [],
  templateUrl: './start-navigation.component.html',
  styleUrls: ['./start-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartNavigationComponent {}
