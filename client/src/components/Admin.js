import React from 'react';
import { Link } from 'react-router';

const Admin = (props) => (
  <div>
    <p>
      <Link to={'/'}>Blog</Link> |&nbsp;
      <Link to={'admin/categories'}>Categories</Link>
    </p>
    <hr />
    {props.children}
  </div>
);

export default Admin;
