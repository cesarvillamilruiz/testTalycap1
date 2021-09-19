import { AuthorBookService } from './../../services/author-book.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

import { AuthorDTO } from 'src/app/Interfaces/AuthorDTO';
import { AuthorService } from 'src/app/services/author.service';
import { Book } from 'src/app/Interfaces/Book';
import { BookService } from './../../services/book.service';


@Component({
  selector: 'app-author-book',
  templateUrl: './author-book.component.html',
  styleUrls: ['./author-book.component.scss']
})
export class AuthorBookComponent implements OnInit {

  public page = 1;
  public pageSize = 10;
  closeResult = '';
  booksFromAuthorId: Book[];

  authors: AuthorDTO[] = [];
  books: Book[] = [];

  currenFirstName: string;
  currenLastName: string;

  fileName= 'ExcelSheet.xlsx';

  constructor(
              private authorBookService: AuthorBookService,
              private authorService: AuthorService,
              private bookService: BookService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.addWithAsync();
    console.log();
  }

  async addWithAsync() {
    this.authors = await this.authorService.getAllAuthors().toPromise();
    this.books = await this.bookService.getAllBooks().toPromise();
    this.mathcAuthorBooks();
    alert('The authors and books are ready to be shown')
  }

  mathcAuthorBooks(){
    this.authors.forEach(e => {
      e.books = this.books.filter(b => b.authorId == e.id);
    });
  }

  getAllAuthors(){
    this.authorService.getAllAuthors().subscribe(author =>{
      this.authors = author;
    });
  }

  getAllBooks(){
    this.bookService.getAllBooks().subscribe(books =>{
      this.books = books;
    });
  }

  exportexcel(): void
    {
       /* table id is passed over here */
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);

    }

  getbooksFomAuthorId(id: number, firstName: string, lastName: string){

    if(Number(id)){
      this.currenFirstName = firstName;
      this.currenLastName = lastName;
      this.authorBookService.getbooksFomAuthorId(id).subscribe( b => {
        this.booksFromAuthorId = b.books;
      });
    }
    else{
        alert('it has given an invalid argument');
      }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
