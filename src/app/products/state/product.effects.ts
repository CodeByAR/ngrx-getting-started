import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as ProductActions from '../state/product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((err) =>
            of(ProductActions.loadProductsFailure({ error: err }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => ProductActions.updateProductSuccess({ product })),
          catchError((err) =>
            of(ProductActions.updateProductFailure({ error: err }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductActions.createProduct),
        concatMap(action =>
          this.productService.createProduct(action.product)
            .pipe(
              map(product => ProductActions.createProductSuccess({ product })),
              catchError(error => of(ProductActions.createProductFailure({ error })))
            )
        )
      );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductActions.deleteProduct),
        mergeMap(action =>
          this.productService.deleteProduct(action.productId).pipe(
            map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
            catchError(error => of(ProductActions.deleteProductFailure({ error })))
          )
        )
      );
  });
}
