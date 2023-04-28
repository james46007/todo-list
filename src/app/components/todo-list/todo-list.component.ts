import {Component} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/Todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  showNotCompleted = true;
  completed = 0;
  todoList: Todo[] = [];

  constructor(
    public todoService: TodoService
  ) {
  }

  ngOnInit(): void {
    this.todoList = this.todoService.getAll();
    this.completed = this.todoService.completedTaks().length;
    console.log(this.todoList)
  }

  filter(e: any) {
    this.getAllTaks();
    let countCompleted = 0;
    this.todoList = this.todoList.filter(item => {
      if (e.target.value === '') {
        if (item.completed) {
          countCompleted++;
        }
        return item
      } else {
        if (item.description.includes(e.target.value)) {
          if (item.completed) {
            countCompleted++;
          }
          return true;
        } else {
          return false;
        }
      }
    });
    this.completed = countCompleted;
  }

  tasksNotCompleted(showNotCompleted: boolean) {
    0
    this.todoList = this.todoList.filter(item => {
      if (item.completed === showNotCompleted) {
        return item;
      } else {
        return false;
      }
    });
    this.completed = 0
    this.showNotCompleted = showNotCompleted;
  }


  completedTaks($event: any) {
    this.completed = $event ? ++this.completed : --this.completed;
  }

  getAllTaks() {
    this.todoList = this.todoService.getAll();
  }
}
