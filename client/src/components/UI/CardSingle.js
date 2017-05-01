import React, { Component } from 'react';

import { Card, CardBlock } from 'reactstrap';

export default (props) => (
  <Card className="mx-auto" style={{maxWidth: '400px', marginTop: '50px'}}>
    <CardBlock>{props.children}</CardBlock>
  </Card>
);
