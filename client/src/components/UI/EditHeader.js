import React, { Component } from 'react';
import { Badge } from 'reactstrap';

export default (props) => {
  const { isNew, children, onDelete } = props;

  return (
    <h2>
      { children }
      { !isNew && <Badge color="danger" onClick={onDelete}>X</Badge> }
    </h2>
  );
}
