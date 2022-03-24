import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITodo } from '../shared/model/todo.interface';
import { ITask } from '../shared/model/task.interface';
import { TodoService } from '../shared/service/todo.service';
import { Router } from '@angular/router';
import { fromEvent, map, debounceTime, distinctUntilChanged, tap } from 'rxjs';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  todos: ITodo[] = [];
  isSearching: boolean = false;
  constructor(private todoService: TodoService, private router: Router) { }
  ngOnInit(): void {
    this.search();
    this.getTodos();
  }
  private getTodos(): void {
    this.todoService.getTodos().subscribe(resp => {
      this.todos = resp;
    });
  }
  private searchData(keyword: string): void {
    this.todoService.search(keyword).subscribe(resp => {
      this.todos = resp;
    });
  }
  public checkComplete(todo: ITodo): void {
    this.todoService.checkComplete(todo).subscribe(resp => {
      /** */
    })
  }
  public deleteTask(todo: ITodo, task: ITask): void {
    this.todoService.deleteTask(task.id).pipe(tap(resp => {
      if (resp) {
        this.checkComplete(todo);
      }
    })).subscribe()
  }
  public deleteTodo(todo: ITodo): void {
    this.todoService.deleteTodo(todo.id).pipe(tap(resp => {
      if (resp) {
        this.getTodos();
      }
    })).subscribe();
  }
  public edit(todo: ITodo): void {
    this.todoService.updateTodo(todo).subscribe(resp => {
      if (resp) {
        /** */
      }
    })
  }
  public search(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      if (text) {
        this.searchData(text);
      } else {
        this.getTodos();
      }
    });
  }
}
