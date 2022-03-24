import { Injectable } from '@angular/core';
import { ITodo } from '../model/todo.interface';
import { ITask } from '../model/task.interface';
import { Observable, of } from 'rxjs';
import { ITodoService } from '../model/todo-service.interface';
import { ITaskService } from '../model/task-service.interface';
@Injectable({
  providedIn: 'root'
})
export class TodoService implements ITodoService, ITaskService {
  todoId: number = 34;
  private todos: ITodo[] = [
    {
      title: 'House work',
      desc: 'My House works',
      tasks: [
        { id: 1, title: 'Cleaning my own room' },
        { id: 2, title: 'Cleaning yard', done: true },
        { id: 3, title: 'Moving boxes from yard to closet' },
      ],
      color: '#ffe082',
      date: 'Wed Mar 23 2022 18:19:46 GMT+0430 (Iran Daylight Time)',
      id: 1,
      complete: false,
    },
    {
      title: 'To shop',
      desc: 'Buy the things my mom needs',
      tasks: [
        { id: 4, title: 'Bread', done: true },
        { id: 5, title: 'Salt', done: true },
        { id: 6, title: 'Garlic', done: true },
        { id: 7, title: 'Onion', done: true },
        { id: 8, title: 'Oil', done: true },
        { id: 9, title: 'Bean', done: true },
        { id: 10, title: 'Lentils', done: true },
      ],
      color: '#ffeb3b',
      date: 'Wed Mar 23 2022 18:25:46 GMT+0430 (Iran Daylight Time)',
      id: 2,
      complete: true,
    },
    {
      title: 'Linkedin',
      desc: 'LinkedIn post',
      tasks: [
        { id: 11, title: 'Javascript array ' },
        { id: 12, title: 'Custom pipe in Angular' },
      ],
      color: '#9ccc65',
      date: 'Wed Mar 23 2022 18:30:26 GMT+0430 (Iran Daylight Time)',
      id: 3,
    },
    {
      title: 'Email',
      desc: 'Send Email to someone',
      tasks: [
        { id: 13, title: 'My friend' },
        { id: 14, title: 'My boss' },
      ],
      color: '#80deea',
      date: 'Wed Mar 23 2022 18:31:36 GMT+0430 (Iran Daylight Time)',
      id: 4,
    },
    {
      title: 'Project',
      desc: 'My project',
      tasks: [
        { id: 15, title: 'Complate table and form' },
        { id: 16, title: 'Fix bugs' },
        { id: 17, title: 'Test ' },
      ],
      color: '#ff9800',
      date: 'Wed Mar 23 2022 18:34:24 GMT+0430 (Iran Daylight Time)',
      id: 5,
    },
    {
      title: 'Twiter',
      desc: '',
      tasks: [{ id: 18, title: 'Check twiter', done: true }],
      color: '#9fa8da',
      date: 'Wed Mar 23 2022 18:39:07 GMT+0430 (Iran Daylight Time)',
      id: 6,
      complete: true,
    },
    {
      title: 'Car',
      desc: 'My Car',
      tasks: [{ id: 19, title: ' Cleaning car windshield', done: true }],
      color: '#d1c4e9',
      date: 'Wed Mar 23 2022 18:41:43 GMT+0430 (Iran Daylight Time)',
      id: 7,
      complete: true,
    },
    {
      title: 'Download',
      desc: 'Download some music',
      tasks: [
        { id: 20, title: 'leila forouhar' },
        { id: 21, title: 'Shadmehr Aghili' },
      ],
      color: '#02ff81',
      date: 'Wed Mar 23 2022 18:46:11 GMT+0430 (Iran Daylight Time)',
      id: 8,
    },
    {
      title: 'Pharmacy',
      desc: 'Shopping something',
      tasks: [
        { id: 22, title: "My grandmother's medicines" },
        { id: 23, title: 'Toothpaste' },
        { id: 24, title: 'Sweet almond oil' },
        { id: 25, title: 'moisturizing lotion' },
        { id: 26, title: 'Washing gloves' },
      ],
      color: '#00ffcb',
      date: 'Wed Mar 23 2022 18:53:33 GMT+0430 (Iran Daylight Time)',
      id: 9,
    },
    {
      title: 'Designing',
      desc: '',
      tasks: [{ id: 27, title: 'Poster', done: true }],
      color: '#ffca28',
      date: 'Wed Mar 23 2022 18:55:57 GMT+0430 (Iran Daylight Time)',
      id: 10,
      complete: true,
    },
    {
      title: 'Cooking',
      desc: '',
      tasks: [
        { id: 28, title: 'Soup', done: true },
        { id: 29, title: 'Kebab', done: true },
        { id: 30, title: 'Rice', done: true },
      ],
      color: '#d4e157',
      date: 'Wed Mar 23 2022 18:58:15 GMT+0430 (Iran Daylight Time)',
      id: 11,
      complete: true,
    },
    {
      title: 'Work out',
      desc: '',
      tasks: [
        { id: 31, title: 'Riding bike' },
        { id: 32, title: 'basketball' },
      ],
      color: '#81f200',
      date: 'Wed Mar 23 2022 19:02:03 GMT+0430 (Iran Daylight Time)',
      id: 12,
    },
    {
      title: 'Practice',
      desc: '',
      tasks: [{ id: 33, title: 'English' }],
      color: '#80cbc4',
      date: 'Wed Mar 23 2022 19:03:30 GMT+0430 (Iran Daylight Time)',
      id: 13,
    },
  ];
  constructor() { }
  getTodo(todoId: number): Observable<ITodo> {
    const todo: ITodo | undefined = this.todos.find(val => val.id == todoId);
    if (todo) {
      return of(todo);
    } else {
      return of();
    }
  }
  addTask(todoId: number, task: ITask): Observable<number> {
    let id: number = 0;
    this.todos.map(val => {
      if (val.id == todoId) {
        id = val?.tasks.length + 1;
        val.tasks.push({
          ...task,
          id
        });
      }
    })
    return of(id);
  }
  deleteTask(taskId: number): Observable<string> {
    this.todos.map(val => {
      val.tasks = val.tasks.filter(task =>
        task.id != taskId
      )
    })
    return of('Deleted');
  }
  getTodos(): Observable<ITodo[]> {
    return of(this.todos);
  }
  addTodo(newTodo: ITodo): Observable<number> {
    newTodo.tasks.map(task => {
      task.id = this.todoId++;
    })
    const id = this.todos.length + 1;
    this.todos.push({
      ...newTodo,
      id,
    });
    return of(id);
  }
  updateTodo(todoToUpdate: ITodo): Observable<string> {
    todoToUpdate.tasks.map(task => {
      if (!task.id) {
        task.id = this.todoId++;
      }
    })
    this.todos = this.todos.map((todo: ITodo) => {
      if (todo.id == todoToUpdate.id) {
        return todoToUpdate;
      }
      return todo;
    });
    return of('Updated');
  }
  deleteTodo(todoId: number): Observable<string> {
    this.todos = this.todos.filter((todo: ITodo) =>
      todo.id !== todoId
    );
    return of('Deleted');
  }
  public search(keyword: string): Observable<ITodo[]> {
    const res = this.todos.filter((todo: ITodo) => {
      if (todo.title?.includes(keyword) || todo.desc?.includes(keyword)) {
        return todo;
      }
      const some = todo.tasks.some(task => task.title?.includes(keyword));
      return some;
    });
    return of(res);
  }
  public checkComplete(todoForCheck: ITodo): Observable<string> {
    this.todos.map((todo: ITodo) => {
      if (todo.id == todoForCheck.id) {
        if (todo.tasks.length) {
          const checkComplete = todo.tasks.every(val => val.done);
          todo.complete = checkComplete;
        } else {
          todo.complete = false;
        }
      }
    })
    return of('Deleted');
  }
}
