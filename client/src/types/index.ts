export interface Todo {
    id: number;
    title: string;
    description: string;
    year: string;
    month: string;
    day: string;
    completed: boolean
}

export type NewTodo = Omit<Todo, "id" | "completed">

export type DueDate = Pick<Todo, "day" | "month" | "year">

export type CompleteTodo = Pick<Todo, "id" | "completed">

//navbar types
export interface NavbarState {
    nav: string;
    completed: boolean;
}
  
export type NavAction =
    | { type: "All Todos", }
    | { type: "Completed", }
    | { type: "Group"; completed: boolean; group: string }