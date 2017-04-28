import React, { Component } from 'react';

import { Card, CardBlock } from 'reactstrap';

export default () => (
  <Card className="mx-auto" style={{maxWidth: '400px', marginTop: '50px'}}>
    <CardBlock>{this.props.children}</CardBlock>
  </Card>
);
