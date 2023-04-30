import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { allUsers } from 'src/app/models/users';
import { Subjects } from 'src/app/services/global.service';
import { HttpHeaderService } from 'src/app/services/http-header.service';

@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html',
  styleUrls: ['./manage-subjects.component.scss']
})
export class ManageSubjectsComponent implements OnInit {
  loading = true;
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

    this.http.getHeader(Subjects.get, header).subscribe({
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
