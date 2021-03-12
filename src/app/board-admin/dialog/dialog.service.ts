import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from '../../Models/food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  foodsRecieved: Array<Food> | undefined;
  foods: Array<Food> | undefined;
  selectedFood: Food | undefined;
  action: string | undefined;
  imgHeaders: HttpHeaders | { [header: string]: string[] } | undefined;

  constructor(private httpClient: HttpClient) {}
  foodURL = 'http://localhost:8080/api/images/';
  ngOnInit() {}

  addUploadData(imageFile: FormData) {
    return this.httpClient.post(`${this.foodURL}/images/upload`, imageFile);
  }
  addFood(food: Food) {
    return this.httpClient.post<Food>(`${this.foodURL}/upload/food`, food);
  }
  getFoodById(id: number): Observable<Food> {
    return this.httpClient.get<Food>(`${this.foodURL}/food/${id}`);
  }
}
