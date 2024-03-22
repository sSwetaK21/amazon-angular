import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TableRow } from '../dashboard/components/users/users.component';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductUpdateComponent } from './product-update/product-update/product-update.component';
import { ConfirmDelComponent } from 'src/app/components/confirm-del/confirm-del.component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  displayedColumns: string[] = [
    'image',
    'title',
    'price',
    'discount',
    'brand',
    'delete',
  ];
  dataSource!: MatTableDataSource<any>;
  userlist: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private prodservice: ProductsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    private cd: ChangeDetectorRef
  ) {
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
    this.prodservice.getProducts().subscribe((res) => {
      this.userlist = res;
      // console.log(this.userlist);
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteRow(row: TableRow) {
    // console.log(row, 'row');

    this.prodservice.deleteRow(row.products_id).subscribe(
      (res) => {
        const index = this.dataSource.data.findIndex(
          (r: any) => r.products_id === row.products_id
        );
        // console.log(index !== -1);
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = [...this.dataSource.data]; // Update table on ui like on deleting it will update it no need to refresh for changes
        }
        this.toastr.success('Row deleted successfully');
      },
      (error) => {
        console.log(error);
        this.toastr.error('failed to Delete Row');
      }
    );
  }

  openEditDialog(rowData: any) {
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      width: '100%',
      data: rowData,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadUser();
        }
      },
      error: console.log,
    });

    // dialogRef.afterClosed().subscribe((update) => {
    //   if (update && update.id) {
    //     const index = this.dataSource.data.findIndex(
    //       (row: any) => row.id === update.id.toString() //my id is -1 this will convert into string
    //     );

    //     console.log('edit here', update.id);
    //     if (index !== -1) {
    //       console.log('Hello');
    //       this.dataSource.data[index] = update;
    //       this.dataSource._updateChangeSubscription();
    //       this.toastr.success('Product updated successfully.');
    //     }
    //     this.loadUser();
    //   }
    // });
  }

  opendeleteDialog(row: any) {
    const dialogRef = this.dialog2.open(ConfirmDelComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteRow(row);
      }
    });
  }

  // updatelist() {
  //   this.prodservice.getProducts().subscribe({
  //     next: (res: any) => {
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: console.log,
  //   });
  // }
}
