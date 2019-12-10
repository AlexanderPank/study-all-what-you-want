import { Injectable } from '@angular/core';

export interface PageInfo {
  title: string;
  componentName: string;
}
@Injectable({providedIn: 'root'})
export class TodoService {

  public  info: PageInfo;
  constructor() { }
}
