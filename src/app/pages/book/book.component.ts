import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';

import { Book } from './../../Interfaces/Book';
import { BookService } from './../../services/book.service';
import { AuthorDTO } from './../../Interfaces/AuthorDTO';
import { AuthorService } from './../../services/author.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  faSave = faSave;
  faUndo = faUndo;

  isAdd = false;
  isUpdate = false;
  isDelete = false;

  currentBookId: number;
  currentAuthorId: number;

  books: Book[] = [];
  authors: AuthorDTO[] = [];

  bookAddForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required),
    pageCount: new FormControl('', Validators.required),
    excerpt: new FormControl('',Validators.required),
    publishDate: new FormControl('', Validators.required),
    authorId: new FormControl('', Validators.required)
  });

  constructor(
              private bookService: BookService,
              private authorService: AuthorService) {
  }

  ngOnInit() {
    this.getAllBooks();
    this.getAllAuthors();
  }

  action(value: string){
    this.clear();

    switch(value){
      case 'add':
        this.isAdd = !this.isAdd;
        this.isUpdate = false;
        this.isDelete = false;
        break;
      case 'update':
        this.isUpdate = !this.isUpdate;
        this.isAdd = false;
        this.isDelete = false;
        break;
      case 'delete':
        this.isDelete = !this.isDelete;
        this.isAdd = false;
        this.isUpdate = false;
    }
  }

  newAuthor(){
    let book = {} as Book;
    book.title = this.bookAddForm.value.title;
    book.description = this.bookAddForm.value.description;
    book.pageCount = this.bookAddForm.value.pageCount;
    book.excerpt = this.bookAddForm.value.excerpt;
    book.publishDate = this.bookAddForm.value.publishDate;
    book.authorId = this.bookAddForm.value.authorId;

    this.bookService.addBook(book).subscribe(response => {
      console.log(response + 'from response')
    });

    this.clear();
  }

  updateBook(){
    if(this.currentBookId < 1){
      alert('This is not an existing book');
      return;
    }
    let book = {} as Book;
    book.title = this.bookAddForm.value.title;
    book.description = this.bookAddForm.value.description;
    book.pageCount = this.bookAddForm.value.pageCount;
    book.excerpt = this.bookAddForm.value.excerpt;
    book.publishDate = this.bookAddForm.value.publishDate;
    book.authorId = this.bookAddForm.value.authorId;

    this.bookService.updateBook(book, this.currentBookId).subscribe(response => {
      console.log(response + 'from response')
    });

    let currentBook = {} as Book;
    currentBook = this.getCurrentBook(this.currentBookId);
    let index = this.books.indexOf(currentBook);

    this.books[index].title = this.bookAddForm.value.title;
    this.books[index].description = this.bookAddForm.value.description;
    this.books[index].pageCount = this.bookAddForm.value.pageCount;
    this.books[index].excerpt = this.bookAddForm.value.excerpt;
    this.books[index].publishDate = this.bookAddForm.value.publishDate;
    this.books[index].authorId = this.bookAddForm.value.authorId;

    this.clear();
  }

  deleteBook(){

    let currentBook = {} as Book;
    currentBook = this.getCurrentBook(this.currentBookId);
    let index = this.books.indexOf(currentBook);

    this.bookService.deleteBook(this.currentBookId).subscribe(response => {
      console.log(response+'from response')
    });

    this.books.splice(index, 1);

    this.clear();
  }

  getAllBooks(){
    this.bookService.getAllBooks().subscribe(books =>{
      this.books = books;
    });
  }

  getAllAuthors(){
    this.authorService.getAllAuthors().subscribe(author =>{
      this.authors = author;
    });
  }

  updateBooktId(value){
    if(!isNaN(value) && Number(value) > 0){

      let currentBook = {} as Book;
      currentBook = this.getCurrentBook(Number(value));

      this.currentBookId = currentBook.id;

      this.bookAddForm.controls['title'].setValue(currentBook.title);
      this.bookAddForm.controls['description'].setValue(currentBook.description);
      this.bookAddForm.controls['pageCount'].setValue(currentBook.pageCount);
      this.bookAddForm.controls['excerpt'].setValue(currentBook.excerpt);
      this.bookAddForm.controls['publishDate'].setValue(currentBook.publishDate);
      this.bookAddForm.controls['authorId'].setValue(currentBook.authorId);
    }
  }

  updateAuthortId(value){
    if(!isNaN(value) && Number(value) > 0){

      this.currentAuthorId = Number(value);
      this.bookAddForm.controls['authorId'].setValue(this.currentAuthorId);
    }
  }

  getCurrentBook(value: number): Book {
    let book = {} as Book;
    book = this.books.find(item => item.id == value)
    return book;
  }

  clear(){
    this.bookAddForm.controls['title'].setValue('');
    this.bookAddForm.controls['description'].setValue('');
    this.bookAddForm.controls['pageCount'].setValue('');
    this.bookAddForm.controls['excerpt'].setValue('');
    this.bookAddForm.controls['publishDate'].setValue('');
    this.bookAddForm.controls['authorId'].setValue('');

    this.currentBookId = 0;
    this.currentAuthorId = 0;
  }
}
