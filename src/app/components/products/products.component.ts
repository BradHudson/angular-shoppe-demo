import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ProductService } from 'src/app/services';
import { Product } from 'src/app/models';

/**
 * Breakpoint aliases (e.g. 'sm') to number of grid-list columns.
 */
interface BreakpointMap {
  [name: string]: number
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // TODO (van) a better approach is min/max width based on the product's image size
  private columnBreakpoints: BreakpointMap = {
    'default': 3,
    'xs': 1,
    'sm': 2,
    'md': 3,
    'lg': 4,
    'xl': 5,
  };

  numColumns = this.columnBreakpoints['default'];
  products: Product[] = [];

  constructor(
    private mediaObserver: MediaObserver,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.observeBreakpoints();
    this.buildProductList();
  }

  /**
   * Observes for breakpoint changes and updates the number of columns.
   * See `columnBreakpoints` for breakpoint-to-columns mapping.
   */
  private observeBreakpoints(): void {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      const n = this.columnBreakpoints[change.mqAlias];
      this.numColumns = n > 0 ? n : this.columnBreakpoints['default'];
    });
  }

  /**
   * Builds a list of products from the catalog.
   */
  buildProductList(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}