import {inject, Injectable} from '@angular/core';
import {ApiService, CustomRequest, CustomResponse} from '../../core/services/api.service';
import {map, Observable} from 'rxjs';
import {Chocolate, Price} from '../models';
import type {ChartData, ChartOptions} from 'chart.js';

type AmountAndPrice = [number, Price | undefined]

@Injectable({
  providedIn: 'root'
})
export class ChocolatesService {

  _api: ApiService = inject(ApiService)


  getChocolates(request: CustomRequest): Observable<CustomResponse<Chocolate[]>> {
    return this._api.fetchData(request)
  }

  getChocolate(id: string): Observable<Chocolate | undefined> {
    //TODO: when actual backend replace with this._api.get<Chocolate>(id)

    return this._api.fetchData<Chocolate[]>({} as CustomRequest).pipe(
      map((response: CustomResponse<Chocolate[]>) =>
        response.data.find((item: Chocolate) => item.id === id)
      )
    );
  }

  updateChocolate(id: string | number, chocolate: Partial<Chocolate>): Observable<Chocolate> {
    return this._api.update<Chocolate>(id, chocolate)
  }

  getLowestPricePer100g(prices: Price[]): AmountAndPrice {
    if (!prices.length) return [0, undefined];

    return prices.reduce((lowestPrice: AmountAndPrice, price: Price): AmountAndPrice => {
      const pricePer100g = (price.price / price.amount) * this.getFactorFromUnit(price.unit);
      return pricePer100g < lowestPrice[0] ? [pricePer100g, price] : lowestPrice;
    }, [Infinity, undefined]);
  }

  getAveragePricePer100g(prices: Price[]): number {
    if (!prices.length) return 0;

    const totalPricePer100g = prices.reduce((total: number, price: Price): number => {
      return total + (price.price / price.amount) * this.getFactorFromUnit(price.unit);
    }, 0);

    return totalPricePer100g / prices.length;
  }

  private getFactorFromUnit(unit: string): number {
    if (unit === 'g') return 100
    else if (unit === 'kg') return 0.1
    else return NaN
  }

  generatePieChartDataAndOptions(chocolate: Chocolate): { data: ChartData, options?: ChartOptions } {
    const backgroundColor = [
      'rgba(54, 162, 235, 0.6)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)'

    ];
    const hoverBackgroundColor = [
      'rgba(54, 162, 235, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'

    ];

    return {
      data: {
        labels: ['Saturated fats', 'Other fats', 'Sugar', 'Other Carbohydrates', 'Protein', 'Salt'],
        datasets: [
          {
            data: [
              chocolate.nutrition.fat.saturated,
              chocolate.nutrition.fat.total - chocolate.nutrition.fat.saturated,
              chocolate.nutrition.carbohydrates.sugar,
              chocolate.nutrition.carbohydrates.total - chocolate.nutrition.carbohydrates.sugar,
              chocolate.nutrition.protein,
              chocolate.nutrition.salt,
            ],
            backgroundColor,
            hoverBackgroundColor
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}g`;
              }
            }
          }
        }
      }
    }
  }
}
