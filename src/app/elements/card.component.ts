import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-card',
  template: '<div class="info"><span class="category-header">{{title}}</span>' +
            '<span class="cnt">({{countElement}})</span></div>\n' +
            '<div class="description">{{description}}</div>',

  styles: ['.category-header{  font-size: 1.5rem;  font-family: Consolas;  font-weight: bold;}' +
           '.info{ display: flex; justify-content: space-between; }' +
           '.cnt{ font-family: Consolas; color:#fefefe; font-size: 1rem; margin-right: 0px;}' +
           '.description{ padding-top: 3px; overflow: hidden; height: 20px; }']
})
export class CardComponent implements OnInit {

  @Input() title : string = 'нет заголовка'
  @Input() countElement:number = 0
  @Input() description : string = 'нет описания'

  constructor() {
  }

  ngOnInit() {
  }

}
