import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

export interface TableRow {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'usertype', 'email', 'delete'];
  dataSource: any;
  userlist: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.loadUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUser() {
    this.authService.getAll().subscribe((res) => {
      this.userlist = res;
      console.log(this.userlist);
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteRow(row: TableRow) {
    const index = this.dataSource.data.findIndex((r: any) => r.id === row.id);
    // console.log(index !== -1);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      // this.dataSource._updateChangeSubscription(); // mat-function which will delete it on runtime
      this.dataSource.data = [...this.dataSource.data]; // Update table on ui like on deleting it will update it no need to refresh for changes
    }

    this.authService.deleteRow(row.id).subscribe(
      (res) => {
        this.toastr.success('Deleted');
      },
      (error) => {
        this.toastr.error('Error Occured');
        console.log(error);
      }
    );
  }
}
