import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todos = [] }) => (
  <div>
    { todos.map(todo => <div key={todo.id}>{todo.name}</div>) }
  </div>
);

Todo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    todo: PropTypes.string
  })).isRequired
};

export default Todo;
