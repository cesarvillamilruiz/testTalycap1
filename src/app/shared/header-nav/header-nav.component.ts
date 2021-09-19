import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent  {

  @Output() actionEvent = new EventEmitter<string>();

  constructor() { }

  action(value: string){
    this.actionEvent.emit(value);
  }

}
