import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import withAuth from './HOCs/withAuth';

const TodoContainer = () => (
  <div>
    <AddTodo />
    <TodoList />
  </div>
);

export default withAuth(TodoContainer);
