import { ITask } from "./task.interface";

export interface ITodo {
    id:number;
    title: string;
    desc?: string;
    date: string;
    color: string;
    complete?: boolean;
    tasks: ITask[];
}
