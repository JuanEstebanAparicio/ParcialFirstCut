import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = '4e00e96c67ee4223bb1f025a5cc903f9';
  private baseUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

getTopHeadlines(category?: string) {
  let url = `${this.baseUrl}/top-headlines?country=us&apiKey=${this.apiKey}`;
  if (category) {
    url += `&category=${category}`;
  }
  return this.http.get<any>(url);
}

}


