import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  users: any;

  constructor(private dataservice: DataServiceService) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.dataservice.getUsersData().subscribe((data) => {
      this.users = data.length;
      console.log('data', data);
    });
  }
}
