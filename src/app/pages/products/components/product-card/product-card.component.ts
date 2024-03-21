import { Component, Input, SimpleChange } from '@angular/core';
import { Product } from 'src/app/dataType';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  constructor() {
    console.log(this.product);
  }
}
