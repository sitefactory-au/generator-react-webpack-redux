import React from 'react';
import { Card, CardText } from 'material-ui/Card';
require('./styles.less');

export default () => <Card><CardText>Hello from <%= name %></CardText></Card>;