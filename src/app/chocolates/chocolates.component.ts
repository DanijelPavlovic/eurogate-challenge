import {Component, inject} from '@angular/core';
import {DataView} from 'primeng/dataview';
import {NgIf, NgFor, CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {rxResource} from '@angular/core/rxjs-interop';
import {ChocolatesService} from './services/chocolates.service';
import {catchError, distinctUntilChanged, map} from 'rxjs';
import {Chocolate} from './models';
import {CustomRequest, CustomResponse} from '../core/services/api.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-chocolates',
  imports: [
    DataView,
    NgIf,
    NgFor,
    CurrencyPipe,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './chocolates.component.html',
  styleUrl: './chocolates.component.css'
})
export class ChocolatesComponent {

  _service: ChocolatesService = inject(ChocolatesService)

  dataRx = rxResource<CustomResponse<Chocolate[]>, CustomRequest>({
    request: (): CustomRequest => ({}),
    loader: ({request}) =>
      this._service.getChocolates(request).pipe(
        distinctUntilChanged(),
        map((response: CustomResponse<Chocolate[]>) => {
          const data = response.data.map((chocolate: Chocolate) => {
            const lowestPrice = this._service.getLowestPricePer100g(chocolate.prices)
            return {
              ...chocolate,
              lowestPricePer100g: lowestPrice[0],
              lowestPriceLink: lowestPrice[1]?.link,
              averagePricePer100g: this._service.getAveragePricePer100g(chocolate.prices),
            }
          })

          return {
            pagination: response.pagination,
            data,
          }
        }),
        catchError((error) => {
          console.error('Error fetching chocolates:', error);
          throw Error('Error fetching chocolates!');
        })
      )
  });

  trackByFn(index: number, item: Chocolate): string {
    return item.id ?? index
  }
}
