import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../Models/food';

@Pipe({ name: 'foodFilter' })
export class FoodFilterPipe implements PipeTransform {
  transform(food: Food[], searchTerm: string): Food[] {
    if (!Food || !searchTerm) {
      return food;
    }
    return food.filter(
      (Food: { title: string }) =>
        Food.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
