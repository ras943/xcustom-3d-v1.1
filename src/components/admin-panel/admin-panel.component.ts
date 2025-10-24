
import { Component, ChangeDetectionStrategy, input, output, signal, inject } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  imports: [FormsModule],
  template: `
    @if(isVisible()) {
      <div class="fixed inset-0 z-[9998] flex items-center justify-center bg-gray-900 bg-opacity-70 animate-fade-in">
        <div class="flex h-[90vh] w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl animate-scale-in">
          <aside class="hidden w-80 bg-gray-900 p-5 text-white md:block">
            <h3 class="text-xl font-bold">Admin Panel</h3>
            <p class="text-sm text-gray-400">Manage your store and products.</p>
          </aside>
          <main class="flex-1 overflow-auto p-5">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold">AI Content Tools</h2>
              <button (click)="close.emit()" class="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
            </div>
            
            <div class="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h4 class="font-semibold text-lg">Generate Product Description</h4>
              <p class="text-sm text-gray-500 mb-4">Enter a product name to generate a description using Gemini AI.</p>
              
              <div class="flex gap-2">
                <input 
                  type="text" 
                  [(ngModel)]="productName"
                  placeholder="e.g., 'Modular Desk Organizer'"
                  class="flex-grow rounded-lg border-gray-300 p-2.5 focus:border-blue-500 focus:ring-blue-500" />
                <button 
                  (click)="generateDescription()" 
                  [disabled]="isLoading() || !productName.trim()"
                  class="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  @if (isLoading()) {
                    <i class="fas fa-spinner fa-spin"></i>
                    <span class="ml-2">Generating...</span>
                  } @else {
                    <span>Generate</span>
                  }
                </button>
              </div>

              @if(generatedDescription()) {
                <div class="mt-4 rounded-lg bg-white p-4 border border-gray-200">
                  <p class="text-gray-700">{{ generatedDescription() }}</p>
                </div>
              }
              @if(error()) {
                <div class="mt-4 rounded-lg bg-red-100 p-4 border border-red-200 text-red-700">
                  <p>{{ error() }}</p>
                </div>
              }
            </div>
          </main>
        </div>
      </div>
    }
  `,
  styles: `
    .animate-fade-in { animation: fadeIn 0.2s ease-out; }
    .animate-scale-in { animation: scaleIn 0.2s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent {
  isVisible = input.required<boolean>();
  close = output<void>();

  private geminiService = inject(GeminiService);

  productName = '';
  isLoading = signal(false);
  generatedDescription = signal('');
  error = signal('');

  async generateDescription() {
    if (!this.productName.trim()) return;

    this.isLoading.set(true);
    this.generatedDescription.set('');
    this.error.set('');

    try {
      const description = await this.geminiService.generateProductDescription(this.productName);
      this.generatedDescription.set(description);
    } catch (err) {
      console.error(err);
      this.error.set('An error occurred while generating the description.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
