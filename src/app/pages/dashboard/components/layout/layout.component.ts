import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  users: any;

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.authservice.getAll().subscribe((data: any) => {
      this.users = data.length;
      console.log('data', data);
    });
  }
}
