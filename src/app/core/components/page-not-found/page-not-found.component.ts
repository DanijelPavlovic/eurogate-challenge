import {Component, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {Location, NgOptimizedImage} from '@angular/common';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-page-not-found',
  imports: [
    Card,
    NgOptimizedImage,
    Button
  ],
  template: `
    <div class="flex items-center justify-center h-screen">
      <p-card header="Simple Card" class=" w-[400px]">
        <ng-template #header>
          <img
            class="rounded-t-xl"
            alt="Card"
            ngSrc="/assets/images/page-not-found.png"
            width="1200"
            height="675"
          />
        </ng-template>

        <ng-template #title>
          <div class="flex justify-center">Page not found</div>
        </ng-template>


        <div class="flex justify-center mt-6">
          <p-button
            size="small"
            label="Go back"
            (click)="location.back()"
          />
        </div>
      </p-card>
    </div>
  `,
})
export class PageNotFoundComponent {
  location: Location = inject(Location);
}
