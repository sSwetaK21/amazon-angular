import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables, ChartConfiguration } from 'chart.js/auto';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css'],
})
export class DoughnutComponent implements OnInit {
  @ViewChild('doughnutChart')
  private doughnutChartRef!: ElementRef<HTMLCanvasElement>;
  private doughnutChart!: Chart<'doughnut', any[], unknown>;

  constructor(private prodService: ProductsService) {}
  category: any;

  ngOnInit(): void {
    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }

    // Initialize the chart
    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Categories',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Category Distribution',
          },
        },
      },
    });

    // Call your service to fetch data
    this.prodService.getCategoryData(this.category).subscribe((data: any) => {
      // Update the chart data with fetched data
      this.doughnutChart.data.labels = data.map(
        (item: any) => item.categoryName
      );
      this.doughnutChart.data.datasets[0].data = data.map(
        (item: any) => item.categoryCount
      );
      this.doughnutChart.update(); // Update the chart to reflect changes
    });
  }
}
