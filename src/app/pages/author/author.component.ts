
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';

import { AuthorDTO } from './../../Interfaces/AuthorDTO';
import { AuthorService } from './../../services/author.service';
import { Book } from './../../Interfaces/Book';
import { BookService } from './../../services/book.service';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  faSave = faSave;
  faUndo = faUndo;

  isAdd = false;
  isUpdate = false;
  isDelete = false;

  currentAuthorId: number;

  authors: AuthorDTO[] = [];
  books: Book[] = [];

  authorAddForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('',Validators.required)
  });

  constructor(
              private bookService: BookService,
              private authorService: AuthorService) {
  }

  ngOnInit() {
    this.getAllAuthors();
    this.getAllBooks();
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
    let author = {} as AuthorDTO;
    author.firstName = this.authorAddForm.value.firstName;
    author.lastName = this.authorAddForm.value.lastName;
    this.authorService.addAuthor(author).subscribe(response => {
      console.log(response+'from response')
    });

    this.clear();
  }

  updateAuthor(){
    let author = {} as AuthorDTO;
    author.firstName = this.authorAddForm.value.firstName;
    author.lastName = this.authorAddForm.value.lastName;

    this.authorService.updateAuthor(author, this.currentAuthorId).subscribe(response => {
      console.log(response+'from response')
    });

    let currentAuthor = {} as AuthorDTO;
    currentAuthor = this.getCurrentAuthor(this.currentAuthorId);
    let index = this.authors.indexOf(currentAuthor);

    this.authors[index].firstName = this.authorAddForm.value.firstName;
    this.authors[index].lastName = this.authorAddForm.value.lastName;

    this.clear();
  }

  deleteAuthor(){

    let currentAuthor = {} as AuthorDTO;
    currentAuthor = this.getCurrentAuthor(this.currentAuthorId);

    let book = {} as Book;
    book = this.books.find(item => item.authorId == currentAuthor.id)

    if(book){
      alert('You can not delete this author, because she or he has a related book ');
      return;
    }

    let index = this.authors.indexOf(currentAuthor);

    this.authorService.deleteUsers(this.currentAuthorId).subscribe(response => {
      console.log(response+'from response')
    });

    this.authors.splice(index, 1);

    this.clear();
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

  updateAuthortId(value){
    if(!isNaN(value) && Number(value) > 0){

      let currentAuthor = {} as AuthorDTO;
      currentAuthor = this.getCurrentAuthor(value);

      this.currentAuthorId = currentAuthor.id;

      this.authorAddForm.controls['firstName'].setValue(currentAuthor.firstName);
      this.authorAddForm.controls['lastName'].setValue(currentAuthor.lastName);
    }
  }

  getCurrentAuthor(value: number): AuthorDTO {
    let author = {} as AuthorDTO;
    author = this.authors.find(item => item.id == value)
    return author;
  }

  clear(){
    this.authorAddForm.controls['firstName'].setValue('');
    this.authorAddForm.controls['lastName'].setValue('');
  }
}
