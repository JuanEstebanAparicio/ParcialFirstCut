import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = '4e00e96c67ee4223bb1f025a5cc903f9';
  private baseUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  getTopHeadlines(category: string = 'general') {
    const url = `${this.baseUrl}/top-headlines?country=co&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

}


