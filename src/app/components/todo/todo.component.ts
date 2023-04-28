import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../models/Todo";
import {TodoService} from "../../services/todo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todoInput: any = {};
  @Output() completedTaks = new EventEmitter<boolean>();
  @Output() getAllTaks = new EventEmitter();

  completed: boolean = false;
  todo: Todo =     {
    id: 1,
    description: 'prueba',
    date: new Date('4-15-2020'),
    completed: false
  };

  constructor(
    public todoService: TodoService,
  ) { }

  ngOnInit(): void {
  }

  onChange(id: number) {
    this.completedTaks.emit(this.todoService.completed(id));
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.getAllTaks.emit();
  }
}
