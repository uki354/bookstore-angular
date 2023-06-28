import { Component } from '@angular/core';
import { Book } from '../model/book.model';
import { BookService } from '../book.service';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartPrice = 0;

  displayedColumns = ['name', 'author', 'quantity']

constructor(private bookService: BookService){};

  getCartItems(): Book[] {
    this.calculateTotalPrice();
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  editModal(book: Book){
    this.bookService.editing = true;
    this.bookService.addToCart(book);
    this.calculateTotalPrice();
  }

  deleteModal(book: Book) {
    let items: Book[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    items = items.filter(x => x.id !== book.id);
    
    localStorage.setItem('cartItems', JSON.stringify(items));
    this.calculateTotalPrice();
  }


  calculateTotalPrice(){
    let items : Book[] =  JSON.parse(localStorage.getItem('cartItems') || '[]');
    let totalPrice = 0;
    items.forEach(x =>{
      totalPrice += (x.price * x.quantity);
    })
    this.cartPrice = totalPrice;
  }

  buyBooks(){
    let items : Book[] =  JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.bookService.buyBooks(items, this.cartPrice);
    this.calculateTotalPrice();
  }


}
