import {Component} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Todo} from "../../models/Todo";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {

  created = true;
  todoFormGroup: FormGroup = this.initForm();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public todoService: TodoService
  ) {
    this.todoFormGroup = this.initForm();
  }

  get todoForm() {
    return this.todoFormGroup.controls;
  }

  initForm() {
    const dateNow: Date = new Date();
    const formatDate = this.formatDate(dateNow)
    return new FormGroup({
      id: new FormControl(0, []),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(formatDate, [Validators.required])
    });
  }

  formatDate(dateNow: any) {
    const anio: number = dateNow.getFullYear();
    const mes: number = dateNow.getMonth() + 1;
    const dia: number = dateNow.getDate();

    return `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        const todo = this.todoService.getAll().find((todo: Todo) => todo.id == params['id']);
        if (!todo) {
          this.router.navigateByUrl("/page-not-found");
          return;
        }
        this.todoFormGroup.patchValue({...todo})
        this.created = false
      } else {
        this.created = true
      }
    });
  }

  onSubmit() {
    if (this.todoFormGroup.value.id === 0) {
      this.todoService['addTodo'](this.todoFormGroup.value);
    } else {
      this.todoService['editTodo'](this.todoFormGroup.value);
      this.router.navigateByUrl("/list");
    }
    this.todoFormGroup = this.initForm();
  }
}
