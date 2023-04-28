import {Injectable} from '@angular/core';
import {Todo} from "../models/Todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  id: number = 0;
  todoList: Todo[] = [];

  constructor(
  ) {
  }



  getAll() {
    return this.todoList;
  }

  addTodo(todo: Todo) {
    const todoList = this.getAll();
    this.id = this.id + 1;

    const item: Todo = {
      id: this.id,
      description: todo.description,
      date: todo.date,
      completed: false
    }
    todoList.push(item)
  }

  editTodo(todo: Todo) {
    const todoList = this.getAll();
    todoList.find(item => {
      if (item.id == todo.id) {
        item.description = todo.description;
        item.date = todo.date;
      }
    });
    this.todoList = [...todoList]
  }

  completed(id: number) {
    const todoList = this.getAll();
    let completedTaks = false;
    todoList.find((item: Todo) => {
      if (item.id === id) {
        item.completed = !item.completed;
        if (item.completed) {
          completedTaks = true;
        }
      }
    });
    this.todoList = [...todoList]
    return completedTaks;
  }

  completedTaks() {
    return this.getAll().filter((todo: Todo) => todo.completed)
  }

  deleteTodo(id: any) {
    const todoList = this.getAll().filter((todo: Todo) => todo.id !== id);
    this.todoList = [...todoList]
  }
}
