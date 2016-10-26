import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { createComponent } from 'react-fela';
import { styles } from './styles';

/*** Example
// Define markup
const TodoList = ( {actions, todos }) => (
  <div>
    todos.map(t => <TodoItem todo={t}/>)
  </div>
);

// Mixin example:
const box = (styles) => (state) => Object.assign( {}, styles, {
    border: '3px solid red',
});

const mixedStyles = box(styles);
****/

const StyledCard = createComponent(styles, Card);

export const <%= name %> = ({actions, name}) => <StyledCard><CardText>Hello from {name}</CardText></StyledCard>;