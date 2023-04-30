import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { allUsers } from 'src/app/models/users';
import { Users } from 'src/app/services/global.service';
import { HttpHeaderService } from 'src/app/services/http-header.service';
import { getPaginationHeaders, getPaginatedResult } from 'src/app/services/pagination-helper';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  loading = false;
  displayedColumns: string[] = ['fullName', 'gender', 'nationalId', 'phoneNumber', 'email', 'action'];
  dataSource!: MatTableDataSource<allUsers>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http:HttpHeaderService, private httpClient:HttpClient) {}


  ngOnInit(): void {
    this.getManageUsers();
    // this.allUsers();
  }

  getManageUsers() {
    this.loading = true;
    let header = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')??''
    });

    this.http.getHeader(Users.get,header).subscribe({
      next:(res) => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // console.log(this.users);
      },
      error:(err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  allUsers() {
    let header = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')??''
    });

    let params = getPaginationHeaders(1,40);

    return getPaginatedResult<allUsers[]>('http://center112001-001-site1.atempurl.com/api/v1/users',params,this.httpClient,header).pipe(
      map(res => {
        console.log(res);
        return res;

      })
    )
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
