
import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="sticky top-0 z-10 flex items-center justify-between bg-white px-7 py-4 shadow-sm">
      <div class="flex items-center gap-2.5 text-lg font-bold">
        <i class="fas fa-cube fa-lg text-blue-600"></i>
        <span>Xustom3D</span>
      </div>
      <nav class="hidden items-center gap-4 md:flex">
        @for (link of navLinks; track link.name) {
          <a 
            href="{{link.route}}" 
            (click)="setActiveLink(link.name)"
            [class.text-blue-600]="activeLink() === link.name"
            [class.after:bg-blue-600]="activeLink() === link.name"
            class="relative rounded-lg px-2.5 py-2 font-medium text-gray-700 hover:text-blue-600 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:rounded transition-colors">
            {{ link.name }}
          </a>
        }
        <a (click)="openAdmin.emit()" class="cursor-pointer rounded-lg px-2.5 py-2 font-medium text-gray-700 hover:text-blue-600">Admin</a>
      </nav>
       <button class="md:hidden text-2xl">
          <i class="fas fa-bars"></i>
       </button>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  openAdmin = output<void>();

  navLinks = [
    { name: 'Home', route: '#home' },
    { name: 'Shop', route: '#shop' },
    { name: 'Customizer', route: '#customize' },
    { name: 'Pricing', route: '#pricing' },
    { name: 'About', route: '#about' },
    { name: 'Contact', route: '#contact' }
  ];

  activeLink = signal('Home');

  setActiveLink(linkName: string) {
    this.activeLink.set(linkName);
  }
}
