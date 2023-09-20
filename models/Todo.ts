export interface UpdatedTodo {
  todo: string
  id: number
}

export interface NewTodo {
  todo : string
  priority: number;
}

export interface UpdatedTodoPriority {
  id : number
  priority : number;
}

export interface Todo {
  id : number,
  todo : string,
  priority: number;
  isCompleted : boolean
}