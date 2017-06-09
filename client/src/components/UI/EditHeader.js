import React from 'react';
import { Badge } from 'reactstrap';

export default ({ isNew, children, onDelete }) => (
  <h2>
    { children }
    { !isNew && <Badge color="danger" onClick={onDelete}>X</Badge> }
  </h2>
);
