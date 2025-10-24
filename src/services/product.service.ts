
import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Custom Lithophane',
      basePrice: 1500,
      imageUrl: 'https://picsum.photos/id/29/400/300',
      colors: ['#ffffff', '#f1f5f9', '#e2e8f0'],
      description: 'Turn your favorite photos into a stunning 3D piece.'
    },
    {
      id: 2,
      name: 'Geometric Planter',
      basePrice: 950,
      imageUrl: 'https://picsum.photos/id/152/400/300',
      colors: ['#a3a3a3', '#10b981', '#f59e0b', '#0ea5e9'],
      description: 'A modern and stylish home for your small plants.'
    },
    {
      id: 3,
      name: 'Phone Stand & Amplifier',
      basePrice: 1100,
      imageUrl: 'https://picsum.photos/id/180/400/300',
      colors: ['#111827', '#6b7280', '#be123c'],
      description: 'Holds your phone and passively amplifies its sound.'
    },
    {
      id: 4,
      name: 'Articulated Dragon',
      basePrice: 2200,
      imageUrl: 'https://picsum.photos/id/1074/400/300',
      colors: ['#7c3aed', '#db2777', '#16a34a', '#ca8a04'],
      description: 'A flexible and fun desk toy with intricate details.'
    }
  ];

  getProducts() {
    return signal(this.products);
  }
}
