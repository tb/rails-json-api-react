import React, { PureComponent, PropTypes } from 'react';
import { Router, Route, IndexRoute, NotFoundRoute } from 'react-router';

import Admin from './Admin';
import Blog from './Blog';
import NotFound from './NotFound'
import { BlogPostShow, BlogPostList } from './Blog/Posts'
import { PostList, PostEdit } from './Posts';
import { CategoryList, CategoryEdit } from './Categories';

export default class Routes extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    const { history } = this.props;

    return (
      <Router history={history}>
        <Route path="admin" component={Admin}>
          <IndexRoute component={PostList}/>
          <Route path="posts/new" component={PostEdit}/>
          <Route path="posts/:id" component={PostEdit}/>
          <Route path="categories" component={CategoryList}/>
          <Route path="categories/new" component={CategoryEdit}/>
          <Route path="categories/:id" component={CategoryEdit}/>
        </Route>
        <Route path="/" component={Blog}>
          <IndexRoute component={BlogPostList}/>
          <Route path="posts/:id" component={BlogPostShow}/>
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}
