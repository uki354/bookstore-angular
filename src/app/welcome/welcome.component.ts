import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../model/book.model';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../book.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit {

  displayedColumns = ['name', 'author', 'issuedAt', 'pages', 'publication', 'genre','price', 'actions'];

  dataSource = new MatTableDataSource<Book>();
  selectedBook: Book | undefined;

  constructor(private http: HttpClient,private dialog: MatDialog, private bookService: BookService){}


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.http.get<Book[]>('http://localhost:8080/api/book/getAll').subscribe(
      resposne=>{
        this.dataSource.data = resposne;
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addToCart(book: Book ): void {
    const token = localStorage.getItem('jwtToken');
    if(token){
      this.bookService.addToCart(book);
    }
    
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  




}

