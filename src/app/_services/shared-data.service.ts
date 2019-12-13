import {Injectable, EventEmitter, Output} from '@angular/core';



@Injectable({
  providedIn: 'root'
})


export class sharedDataService {

  private arr: any[];
  @Output() data = new EventEmitter<any[]>();

  constructor() { }

}
