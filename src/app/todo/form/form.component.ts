import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/shared/model/todo.interface';
import { TodoService } from '../../shared/service/todo.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild("titleInp", { static: true }) titleInp!: ElementRef;
  subscriptions: Subscription[] = [];
  formGroup!: FormGroup;
  todo!: ITodo;
  get title() {
    return this.formGroup.get('title');
  }
  get desc() {
    return this.formGroup.get("desc");
  }
  get tasks(): FormArray {
    return this.formGroup.get("tasks") as FormArray
  }
  get color() {
    return this.formGroup.get("color");
  }
  constructor(private formBuilder: FormBuilder,
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.formGroup = formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      tasks: formBuilder.array([]),
      color: [''],
      date: ['']
    })
  }
  ngOnInit(): void {
    this.init();
  }
  private init(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (!id) {
      this.color?.setValue('#fff59D')
      return;
    }
    this.subscriptions.push(this.todoService.getTodo(+id).subscribe(resp => {
      if (resp) {
        this.todo = resp;
        this.setFormValue();
      }
    }));
  }
  private setFormValue(): void {
    this.todo.tasks.forEach(val => {
      this.addTask();
    })
    this.formGroup.patchValue(this.todo);
  }
  public newTask(): FormGroup {
    return this.formBuilder.group({
      id: null,
      title: ''
    })
  }
  public addTask() {
    this.tasks.push(this.newTask());
  }
  public removeTask(i: number) {
    this.tasks.removeAt(i);
  }
  public add(addAndNew: boolean = false): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const todo: ITodo = this.formGroup.value;
    todo.date = new Date().toString();
    this.todoService.addTodo(todo).subscribe(resp => {
      if (resp) {
        if (addAndNew) {
          this.formGroup.reset();
        } else {
          this.back();
        }
      }
    })
  }
  public edit(): void {
    const todo: ITodo = this.formGroup.value;
    todo.id = this.todo.id;
    this.todoService.updateTodo(todo).subscribe(resp => {
      if (resp) {
        this.back();
      }
    })
  }
  public cancel(): void {
    this.back();
  }
  private back(): void {
    this.router.navigate(['/to-do'])
  }
  ngAfterContentInit(): void {
    this.titleInp?.nativeElement.focus();
  }
  private unsub(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  ngOnDestroy(): void {
    this.unsub();
  }
}
