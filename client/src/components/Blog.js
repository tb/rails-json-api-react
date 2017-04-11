import React from 'react';
import { Link } from 'react-router';

const Blog = (props) => (
  <div>
    <p>
      <Link to={'/admin'}>Admin</Link> |&nbsp;
    </p>
    <hr />
    {props.children}
  </div>
);

export default Blog;
