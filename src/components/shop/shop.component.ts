
import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-shop',
  imports: [NgOptimizedImage],
  template: `
    <section id="shop-section" class="px-[6vw] py-16">
      <h2 class="mb-6 text-3xl font-bold">Popular Products</h2>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        @for (product of products(); track product.id) {
          <div class="transform rounded-xl bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div class="relative h-48 w-full">
              <img [ngSrc]="product.imageUrl" [alt]="product.name" fill class="rounded-lg object-cover bg-indigo-50" />
            </div>
            <h3 class="mt-4 text-lg font-bold">{{ product.name }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="font-semibold text-gray-800">₨ {{ product.basePrice }}</span>
              <button (click)="customizeProduct.emit(product)" class="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100">Customize</button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  customizeProduct = output<Product>();
  private productService = inject(ProductService);
  products = this.productService.getProducts();
}
