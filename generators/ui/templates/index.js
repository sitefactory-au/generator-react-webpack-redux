import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { createComponent } from 'react-fela';
import { styles } from '/styles';

const StyledCard = createComponent(styles, Card);

export default () => <StyledCard><CardText>Hello from <%= name %></CardText></StyledCard>;