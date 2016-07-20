import React, {
  Component,
  PropTypes
} from 'react';
import { Card, CardText } from 'material-ui/Card';
/*** Example
// Define markup
const TodoList = ( {actions, todos }) => (
  <div>
    todos.map(t => <TodoItem todo={t}/>)
  </div>
);
****/
export const MyComponent = ({name}) => <Card><CardText>Hello from {name}</CardText></Card>