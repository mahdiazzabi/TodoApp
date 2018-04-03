export interface TodoItem {
    $key?: string,
    uuid? : string,
    name : string,
    desc? : string,
    complete : Boolean,
    urlImage:string
  }