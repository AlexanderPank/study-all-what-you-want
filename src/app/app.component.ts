import {Component, ElementRef, Input, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('rootElement', {static: false}) elementView: ElementRef;


  title = 'study-all-what-you-want';
  currentName = 'Чтобы помнить';
  showMenu = false;

  constructor( ) {

  }

  ngOnInit() {
    console.log('here')
    document.getElementById('rootElement').style.maxHeight = window.innerHeight - 50 + 'px'
    document.getElementById('rootElement').style.height = window.innerHeight - 50 + 'px'
    document.getElementById('container').style.maxHeight = window.innerHeight - 100 + 'px'
    document.getElementById('container').style.height = window.innerHeight - 50 + 'px'
  }

  hideMainMenu(){
    this.showMenu = true;
    this.changeMainMenuState()
  }
  changeMainMenuState() {

    //this.height = this.elementView.nativeElement.offsetHeight-60 ;
    this.showMenu = !this.showMenu;

    document.getElementById('maskContent').style.width = this.elementView.nativeElement.offsetWidth - 2 + "px";
    document.getElementById('maskContent').style.height = this.elementView.nativeElement.offsetHeight-58 + "px";

    if (this.showMenu) {
      document.getElementById('maskContent').style.visibility = 'visible'
      document.getElementById('maskContent').style.opacity = '1'
      document.getElementById('menuList').style.width =  "100%";
      document.getElementById('menuList').style.height =  this.elementView.nativeElement.offsetHeight-60 + 'px';
      document.getElementById('menuList').style.opacity = '1'

    }
    else {
      document.getElementById('maskContent').style.visibility = 'hidden'
      document.getElementById('maskContent').style.opacity = '0'
      document.getElementById('menuList').style.width =  "0px";
      document.getElementById('menuList').style.opacity = '0'
    }

  }
}
