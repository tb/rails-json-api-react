import React from 'react';
import { Link } from 'react-router';

const App = (props) => (
  <div>
    <p>
      <Link to={'/posts'}>Posts</Link> |&nbsp;
      <Link to={'/categories'}>Categories</Link> |&nbsp;
      <Link to={'/users'}>Users</Link>
    </p>
    <hr />
    {props.children}
  </div>
);

export default App;
