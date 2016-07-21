import React from 'react';
import { Card, CardText } from 'material-ui/Card';
/*** Example
// Define markup
const TodoList = ( {actions, todos }) => (
  <div>
    todos.map(t => <TodoItem todo={t}/>)
  </div>
);
****/
export const <%= name %> = ({actions, name}) => <Card><CardText>Hello from {name}</CardText></Card>;