import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'priceTag' })
export class PricePipe implements PipeTransform {
  transform(value: any): string {
    const formatedPrice = value + ' FCFA';
    return formatedPrice;
  }
}
