import { Component, signal } from '@angular/core';
import { SideMenuBar } from "../side-menu-bar/side-menu-bar";
import { SideMenuOptions } from "../side-menu-options/side-menu-options";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [SideMenuBar, SideMenuOptions],
  host: {
    '[class.is-collapsed]': 'collapsed()',
    '[class.mobile-open]': 'mobileOpen()',
  },
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  collapsed = signal(false);
  mobileOpen = signal(false);

  toggleCollapse(): void {
    this.collapsed.update(v => !v);
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  expandedMenus = signal<Set<string>>(new Set(['mando']));

  toggleMenu(menuId: string): void {
    this.expandedMenus.update(prev => {
      const next = new Set(prev);
      if (next.has(menuId)) next.delete(menuId);
      else next.add(menuId);
      return next;
    });
  }

  isMenuOpen(menuId: string): boolean {
    return this.expandedMenus().has(menuId);
  }
}
