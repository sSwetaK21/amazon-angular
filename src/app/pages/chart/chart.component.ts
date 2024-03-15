import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  title = 'ng-chart';
  chart: any = [];
  isExpanded: boolean = false;

  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.dataService.getUsersData().subscribe((userData: any) => {
      this.dataService.getProductsData().subscribe((productsData: any) => {
        const numUsers = userData.length;
        const numProducts = productsData.length;

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: ['Users', 'Products'],
            datasets: [
              {
                label: 'Total:',
                data: [numUsers, numProducts],
                borderWidth: 1,
                backgroundColor: '#febd69',
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
    });
  }

  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }
}
