import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from './food';

@Injectable({
  providedIn: 'root',
})
export class FoodService implements OnInit {
  private jsonFileURL = 'http://localhost:8080/api/images/allfood';
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formData!: Food;
  list!: Food[];

  getFood(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(this.jsonFileURL);
  }
}
