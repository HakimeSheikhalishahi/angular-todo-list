import { Observable } from "rxjs";
import { ITask } from "./task.interface";

export interface ITaskService {
    addTask(todoId: number, task: ITask): Observable<number>;
    deleteTask(taskId: number): Observable<string>;
}
