
import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customizer-modal',
  imports: [FormsModule],
  template: `
    @if(isVisible()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm animate-fade-in" (click)="close.emit()">
        <div class="w-11/12 max-w-4xl rounded-xl bg-white p-5 shadow-2xl animate-scale-in" (click)="$event.stopPropagation()">
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div class="flex flex-col">
              <div class="flex h-80 flex-1 items-center justify-center rounded-xl" [style.background]="selectedColor()">
                <div class="bg-white/50 p-4 rounded-lg backdrop-blur-xl text-center">
                    <div class="font-bold text-2xl" [style.color]="textColor()">Preview</div>
                     @if(engravingText()) {
                        <div class="mt-2 font-mono text-lg" [style.color]="textColor()">"{{ engravingText() }}"</div>
                     }
                </div>
              </div>
              <div class="mt-3">
                <label class="text-sm font-medium text-gray-600">Choose color</label>
                <div class="mt-2 flex flex-wrap gap-2">
                  @for(color of product().colors; track color) {
                    <div 
                      (click)="selectColor(color)" 
                      class="h-9 w-9 cursor-pointer rounded-md border-2 transition-all"
                      [style.background-color]="color"
                      [class.ring-2]="selectedColor() === color"
                      [class.ring-offset-2]="selectedColor() === color"
                      [class.ring-blue-500]="selectedColor() === color"
                      [class.border-transparent]="selectedColor() !== color"
                      [class.border-gray-300]="selectedColor() === color">
                    </div>
                  }
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-between">
              <div>
                <h3 class="text-2xl font-bold">{{ product().name }}</h3>
                <div class="mt-2 text-lg font-semibold text-gray-800">
                  Price: <strong class="text-blue-600">₨ {{ finalPrice() }}</strong>
                </div>
                <div class="mt-4">
                  <label for="engraving" class="text-sm font-medium text-gray-600">Add engraving (+ ₨ 250)</label>
                  <input 
                    id="engraving" 
                    [ngModel]="engravingText()"
                    (ngModelChange)="engravingText.set($event)"
                    placeholder="Text to engrave"
                    class="mt-1 w-full rounded-lg border-gray-300 p-2.5 focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              <div class="mt-6">
                <div class="flex flex-wrap gap-2">
                  <button class="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">Add to Cart</button>
                  <button class="flex-1 rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-white hover:bg-emerald-600">Buy Now</button>
                </div>
                <button (click)="close.emit()" class="mt-2 w-full rounded-lg bg-red-500 px-4 py-2.5 font-semibold text-white hover:bg-red-600">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .animate-fade-in { animation: fadeIn 0.3s ease; }
    .animate-scale-in { animation: scaleIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizerModalComponent {
  product = input.required<Product>();
  isVisible = input.required<boolean>();
  close = output<void>();

  selectedColor = signal<string>('');
  engravingText = signal('');
  
  finalPrice = computed(() => {
    let price = this.product().basePrice;
    if (this.engravingText().trim().length > 0) {
      price += 250;
    }
    return price;
  });

  // For preview text visibility against background
  textColor = computed(() => {
    const hex = this.selectedColor().replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  });

  constructor() {
    // This is a workaround because inputs are not available in constructor.
    // We set the initial color when the component is initialized with a product.
    // A better approach in future Angular versions might be an effect or different lifecycle hook.
    setTimeout(() => {
        if (this.product()?.colors.length > 0) {
            this.selectedColor.set(this.product().colors[0]);
        }
    });
  }

  selectColor(color: string): void {
    this.selectedColor.set(color);
  }
}
