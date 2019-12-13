import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'main-menu-item',
  template: `<div class="menuItem" (click)="onClick($event)">
                <span><i class="fa {{icon}}"></i></span><span class="text">{{title}}</span><span class="spanvmiddle"></span>
            </div>`,

  styles: [
    `
      .menuItem{

        border-bottom: 1px solid #eaeaea;
        font-family: Verdana;
        font-size: 16px;
        height: 60px;
        cursor: pointer;
        margin:0 auto;
        padding-left: 15px;


      }

      .text{
        vertical-align:  middle;
      }

      .menuItem:hover{
        background-color: #fafafa;
      }

      i{
        width: 50px;
         color: #6996d2;
        font-size: 30px;
        vertical-align:  middle;
      }
      .spanvmiddle
      {
        display:inline-block;
        height:100%;
        width:0px;
        overflow:hidden;
        vertical-align:middle;

      }
    `
  ]
})
export class MainMenuItemComponent implements OnInit {

  @Input() title : string = 'нет заголовка'
  @Input() href : string = ''
  @Input() icon : string = ''

  @Output() selected = new EventEmitter();

  constructor( private router: Router) {
  }

  ngOnInit() {
  }

  onClick(ev) {
    if (this.href!='')
      this.router.navigate([this.href]);
    this.selected.emit()
  }

}
