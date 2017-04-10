import React, { PureComponent, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
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
        <Route path="/" component={App}>
          <IndexRoute component={PostList}/>
          <Route path="/posts" component={PostList}/>
          <Route path="/posts/new" component={PostEdit}/>
          <Route path="/posts/:id" component={PostEdit}/>
          <Route path="/categories" component={CategoryList}/>
          <Route path="/categories/new" component={CategoryEdit}/>
          <Route path="/categories/:id" component={CategoryEdit}/>
        </Route>
      </Router>
    );
  }
}
