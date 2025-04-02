import {Component} from '@angular/core';
import {MenuComponent} from '../../components/menu/menu.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-default-layout',
  imports: [
    MenuComponent,
    RouterOutlet,
  ],
  template: `
    <div class="flex flex-col h-screen">
      <app-menu/>
      <router-outlet/>
    </div>
  `,
})
export class DefaultLayoutComponent {


}
