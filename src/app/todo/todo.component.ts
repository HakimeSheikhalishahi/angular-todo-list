import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITodo } from '../shared/model/todo.interface';
import { ITask } from '../shared/model/task.interface';
import { TodoService } from '../shared/service/todo.service';
import { Router } from '@angular/router';
import { fromEvent, map, debounceTime, distinctUntilChanged, tap, Subscription } from 'rxjs';
import { NgxMasonryComponent } from 'ngx-masonry';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @ViewChild('masonry') masonry!: NgxMasonryComponent;
  subscriptions: Subscription[] = [];
  todos: ITodo[] = [];
  isSearching: boolean = false;
  constructor(private todoService: TodoService) { }
  ngOnInit(): void {
    this.search();
    this.getTodos();
  }
  private getTodos(): void {
    this.subscriptions.push(this.todoService.getTodos().subscribe(resp => {
      this.todos = resp;
    }));
  }
  private searchData(keyword: string): void {
    this.subscriptions.push(this.todoService.search(keyword).subscribe(resp => {
      this.todos = resp;
    }));
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
        this.masonry.reloadItems();
        this.masonry.layout();
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
  private unsub(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  ngOnDestroy(): void {
    this.unsub();
  }
}
