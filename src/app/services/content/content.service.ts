import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

export enum ContentType {
  article = 'article',
  video = 'video',
  podcast = 'podcast',
  book = 'book',
  youtube = 'youtube',
  course = 'course'
}

export interface ContentQuery {
  type: ContentType | 'all';
  query?: string;
  limit?: number;
  skip?: number;
  sortBy?: {
    [key: string]: 1 | -1;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private baseUrl = '/api/content';

  constructor(private http: HttpClient) {}

  $singleItem(id: string) {
    return this.http.get(`http://localhost:4001${this.baseUrl}/${id}`).pipe(take(1));
  }

  // $search(contentQuery: ContentQuery) {
  //   return toSignal(this.http.post(`${this.baseUrl}/search`, contentQuery).pipe(take(1)));
  // }
}
