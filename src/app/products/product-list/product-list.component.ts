import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';

import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  // errorMessage: string;

  displayCode: boolean;

  // products: Product[];
  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  // selectedProduct: Product | null;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  // sub: Subscription;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   (currentProduct) => (this.selectedProduct = currentProduct)
    // );

    // TODO: Unsubscribe

    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => (this.products = products),
    //   error: (err) => (this.errorMessage = err),
    // });

    // TODO: Unsubscribe
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
    // this.displayCode = !this.displayCode;
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
    // this.productService.changeSelectedProduct(product);
  }
}
