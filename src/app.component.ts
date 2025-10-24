
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ShopComponent } from './components/shop/shop.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomizerModalComponent } from './components/customizer-modal/customizer-modal.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    ShopComponent,
    FooterComponent,
    CustomizerModalComponent,
    AdminPanelComponent,
  ]
})
export class AppComponent {
  isCustomizerVisible = signal(false);
  isAdminVisible = signal(false);
  selectedProduct = signal<Product | null>(null);

  openCustomizer(product: Product): void {
    this.selectedProduct.set(product);
    this.isCustomizerVisible.set(true);
  }
  
  openCustomizerFromHero(): void {
    // A default or featured product could be used here.
    // For simplicity, we'll create a dummy one.
    const featuredProduct: Product = {
      id: 0,
      name: 'Articulated Dinosaur',
      basePrice: 1200,
      imageUrl: 'https://picsum.photos/id/107/400/300',
      colors: ['#22c55e', '#3b82f6', '#ef4444', '#7c3aed', '#f97316'],
    };
    this.openCustomizer(featuredProduct);
  }

  closeCustomizer(): void {
    this.isCustomizerVisible.set(false);
    this.selectedProduct.set(null);
  }

  toggleAdminPanel(): void {
    this.isAdminVisible.update(visible => !visible);
  }
}
