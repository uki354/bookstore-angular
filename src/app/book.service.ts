import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Book } from "./model/book.model";
import { CartModalComponent } from "./cart-modal/cart-modal.component";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class BookService{

    editing = false;

    constructor(private dialog: MatDialog, private http: HttpClient ){};

    addToCart(book: Book ): void {
        const dialogRef = this.dialog.open(CartModalComponent,{
          data:book
        });
    
    
        dialogRef.afterClosed().subscribe(result =>{
          if(result){
            let cartItems: Book[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
            let found = false;
    
            if(book.quantity == 0 || book.quantity == undefined){
              book.quantity = 1;
            }
            
            cartItems.forEach(x => {
              if(x.name === book.name){
                if(this.editing){
                    x.quantity = book.quantity;
                    this.editing = false;
                }else{
                    x.quantity += book.quantity;
                    
                }
                found = true;                
              }
              });
              if(!found){
                cartItems.push(book);
              }
    
            if(cartItems.length == 0){
              cartItems.push(book);
            }
    
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
          }
        })
      }
    
    
      selectBook(book: Book): any{
        this.http.get<Book>('http://localhost:8080/api/book/get/' + book.id).subscribe(
          response => {
            return response;
          },error =>{          }          
        );
        
      }



      buyBooks(books: Book[], totalPrice: number): void {
        const data = {
          books: books,
          totalPrice: totalPrice
        };
      
        this.http.post("http://localhost:8080/api/book/buy", data)
          .subscribe(
            response => {
              localStorage.removeItem("cartItems");
            },
            error => {
              console.error(error);
            }
          );
      }


}