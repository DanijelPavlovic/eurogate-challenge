import {Component, inject} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Button} from 'primeng/button';
import {LayoutService} from '../../layouts/layout.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-menu',
  imports: [
    Menubar,
    Button
  ],
  template: `
    <p-menubar [model]="items" styleClass="border-0">
      <ng-template #end>
        <div class="flex items-center gap-2">
          <p-button
            icon="pi pi-arrow-left"
            severity="secondary"
            [rounded]="true"
            [text]="true"
            [raised]="true"
            (click)="goBack()"
          />
          <p-button
            text
            rounded
            [severity]="layoutService.isDarkMode() ? 'warn' : 'secondary'"
            [icon]="layoutService.isDarkMode() ? 'pi pi-sun' : 'pi pi-moon'"
            (click)="layoutService.toggleDarkMode()"
          />
        </div>
      </ng-template>
    </p-menubar>`,
})
export class MenuComponent {

  layoutService: LayoutService = inject(LayoutService)
  location: Location = inject(Location)

  items: MenuItem[] = [
    {
      label: 'Chocolates',
      icon: 'pi pi-star',
      routerLink: '/chocolates',
    },
  ];

  goBack() {
    this.location.back();
  }
}
