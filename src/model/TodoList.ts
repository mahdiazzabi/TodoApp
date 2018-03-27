import { TodoItem } from "./TodoItem";

export interface TodoList {
    $key?: string
    uuid : string,
    name : string,
    items? : TodoItem[]
  }
  
