import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { allUsers } from 'src/app/models/users';
import { Centers } from 'src/app/services/global.service';
import { HttpHeaderService } from 'src/app/services/http-header.service';

@Component({
  selector: 'app-manage-centers',
  templateUrl: './manage-centers.component.html',
  styleUrls: ['./manage-centers.component.scss']
})
export class ManageCentersComponent implements OnInit {
  loading = false;
  displayedColumns: string[] = ['fullName', 'gender', 'nationalId', 'phoneNumber', 'email', 'action'];
  dataSource!: MatTableDataSource<allUsers>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpHeaderService) { }


  ngOnInit(): void {
    this.getManageCenters();
  }
  getManageCenters() {
    this.loading = true;
    let header = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token') ?? ''
    });

    this.http.getHeader(Centers.get, header).subscribe({
      next: (res) => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
