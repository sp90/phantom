import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartFooterComponent } from '../start-footer/start-footer.component';
import { StartNavigationComponent } from '../start-navigation/start-navigation.component';

@Component({
  selector: 'app-start-layout',
  standalone: true,
  imports: [RouterOutlet, StartFooterComponent, StartNavigationComponent],
  templateUrl: './start-layout.component.html',
  styleUrls: ['./start-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class StartLayoutComponent {}
