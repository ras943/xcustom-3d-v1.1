
import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <section id="home" class="flex min-h-[80vh] flex-col items-center gap-10 px-[6vw] py-16 text-center md:flex-row md:text-left">
      <div class="max-w-2xl">
        <h1 class="mb-3 text-4xl font-bold leading-tight md:text-5xl">Make it yours — 3D printed, custom-made products</h1>
        <p class="mb-5 text-lg text-gray-500">Create, customize and order unique 3D accessories and decor. Live preview, instant pricing and local shipping.</p>
        <div class="flex flex-wrap justify-center gap-3 md:justify-start">
          <a href="#shop-section" class="inline-block cursor-pointer rounded-lg border-none bg-blue-600 px-5 py-3 font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-800">Shop Now</a>
          <button (click)="openCustomizer.emit()" class="cursor-pointer rounded-lg border border-blue-100 bg-transparent px-5 py-3 font-semibold text-blue-600 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-50">Open Customizer</button>
        </div>
      </div>
      <div class="md:order-last order-first flex-shrink-0">
        <div class="flex h-[300px] w-full max-w-[420px] flex-col items-center justify-center rounded-xl bg-white p-5 shadow-md">
          <div class="text-sm text-gray-500">Featured Custom Item</div>
          <div class="mt-2 text-xl font-bold">Articulated Dinosaur</div>
          <div class="mt-4 text-gray-500">From ₨ 1,200 — Ships in 3 days</div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  openCustomizer = output<void>();
}
