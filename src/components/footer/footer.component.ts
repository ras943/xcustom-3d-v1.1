
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="mt-10 bg-gray-900 px-[6vw] py-10 text-white">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <div class="font-bold">Xustom3D</div>
          <div class="text-sm text-gray-400">Custom 3D printed products, made locally.</div>
        </div>
        <div>
          <div class="font-bold">Quick Links</div>
          <div class="text-sm text-gray-400">Home • Shop • Customizer • Contact</div>
        </div>
        <div>
          <div class="font-bold">Follow</div>
          <div class="text-sm text-gray-400">@xustom3d</div>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {{ currentYear }} Xustom3D. All rights reserved.
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
