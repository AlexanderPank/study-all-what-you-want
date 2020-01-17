export class Definition{
  id:number;
  title: string;
  values: string[];
  voice:string;
  img:string;
  constructor(id:number = -1, title:string = "", values:string = [])  {
    this.id=id;
    this.title = title
    this.values = values;
    this.img = "";
    this.voice = "";

  }
}
