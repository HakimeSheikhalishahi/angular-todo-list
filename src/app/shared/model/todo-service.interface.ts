import { Observable } from "rxjs";
import { ITodo } from "./todo.interface";

export interface ITodoService {
    getTodos(): Observable<ITodo[]>;
    getTodo(todoId: number): Observable<ITodo>;
    
    addTodo(newTodo: ITodo): Observable<number>;
    
    updateTodo(todoToUpdate: ITodo): Observable<string>;
    
    deleteTodo(todoId: number): Observable<string>;
    search(keyword: string): Observable<ITodo[]>;
    checkComplete(todoForCheck: ITodo): Observable<string>;
}
