import {Component, inject, OnInit} from '@angular/core';
import {Chocolate, Price} from '../../models';
import {ChocolatesService} from '../../services/chocolates.service';
import {ActivatedRoute} from '@angular/router';
import {CurrencyPipe, NgClass, NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import {
  PieChartComponent,
} from '../../../core/components/charts/pie-chart/pie-chart.component';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {ChocolateFormComponent} from '../chocolate-form/chocolate-form.component';
import type {ChartData, ChartOptions} from "chart.js";

@Component({
  selector: 'app-chocolate-details',
  imports: [
    NgIf,
    NgFor,
    PieChartComponent,
    CurrencyPipe,
    Card,
    NgOptimizedImage,
    Button,
    ChocolateFormComponent,
    NgClass
  ],
  templateUrl: './chocolate-details.component.html',
  styleUrl: './chocolate-details.component.css'
})
export class ChocolateDetailsComponent implements OnInit {

  _service: ChocolatesService = inject(ChocolatesService);
  _route: ActivatedRoute = inject(ActivatedRoute)
  chocolate: Chocolate | undefined;
  chartData: { data: ChartData, options?: ChartOptions } | undefined
  lowestPrice: Price | undefined;

  isEditMode = false;

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');

    if (id) {
      this._service.getChocolate(id).subscribe(chocolate => {
        if (!chocolate) return;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, lowestPrice] = this._service.getLowestPricePer100g(chocolate.prices);
        this.lowestPrice = lowestPrice;

        if (!this.chartData) {
          this.chartData = this._service.generatePieChartDataAndOptions(chocolate);
        }

        this.chocolate = chocolate;
      });
    }
  }

  trackByFn(index: number): number {
    return index
  }
}
