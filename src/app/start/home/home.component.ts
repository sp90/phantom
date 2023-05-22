import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';

import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

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
  $singleItem = signal<any>(null);
  asyncItem$ = this.contentService.$singleItem('646a7b356ec5c066d24a67d3').pipe(
    tap(console.log),
    tap((res) => this.$singleItem.set(res))
  );

  constructor(
    private contentService: ContentService,
    private pageTitle: Title,
    private meta: Meta
  ) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.contentService
      .$singleItem('646a7b356ec5c066d24a67d3')
      .pipe(
        tap(console.log),
        tap((res) => this.$singleItem.set(res))
      )
      .subscribe();

    this.pageTitle.setTitle('Some SEO friendly title displayed as a title in search results');
    this.meta.addTag({
      name: 'description',
      content:
        'Some seo friendly description used by the search engines to display a description for this page'
    });
  }
}
