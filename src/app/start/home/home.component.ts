import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ContentService]
})
export default class HomeComponent {
  $singleItem = this.contentService.$singleItem('646a7b356ec5c066d24a67d3');

  constructor(private contentService: ContentService) {}
}
