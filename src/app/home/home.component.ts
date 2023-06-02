import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {
  @Input({ required: true }) id!: string;

  $item = toSignal(this.http.get(`http://localhost:4001/api/content/${this.id}`));

  constructor(private http: HttpClient) {}
}
