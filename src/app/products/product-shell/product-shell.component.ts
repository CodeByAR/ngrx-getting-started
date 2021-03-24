import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Product } from '../product';

import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from '../state';
import * as ProductActions from '../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  pageTitle = 'Products';
  displayCode: boolean;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }
}
