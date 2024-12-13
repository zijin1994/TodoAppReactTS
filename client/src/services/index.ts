import axios from 'axios';
import { Todo, NewTodo, CompleteTodo } from '../types';

export const getTodos = async () => {
  const response = await axios.get<Todo[]>("/api/todos");
  return response.data;
};

export const createTodo = async (todo: NewTodo) => {
  const response = await axios.post<Todo>("/api/todos", todo);
  return response.data;
};

export const updateTodo = async (todo: Todo | CompleteTodo) => {
  const response = await axios.put<Todo>(`/api/todos/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number):Promise<void> => {
  const response = await axios.delete(`/api/todos/${id}`);
  return response.data;
};