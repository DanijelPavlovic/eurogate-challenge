import {Component, Input} from '@angular/core';
import {UIChart} from 'primeng/chart';
import {ChartData, ChartOptions} from 'chart.js';


@Component({
  selector: 'app-pie-chart',
  imports: [
    UIChart,
  ],
  template: `
    <p-chart type="pie" [data]="data" [options]="options"/>
  `,
})
export class PieChartComponent {
  @Input() data: ChartData | undefined;
  @Input() options: ChartOptions | undefined;
}
