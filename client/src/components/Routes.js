import React, { PureComponent, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import { getUser } from '../store/api';
import App from './App';
import { PostList, PostEdit } from './Posts';
import { CategoryList, CategoryEdit } from './Categories';
import { UserList, UserEdit } from './Users';
import { Login } from './Auth';

const UserIsAuthenticated = UserAuthWrapper({ authSelector: getUser });

export default class Routes extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    const { history } = this.props;

    return (
      <Router history={history}>
        <Route path="/" component={UserIsAuthenticated(App)}>
          <IndexRoute component={PostList}/>
          <Route path="/posts" component={PostList}/>
          <Route path="/posts/new" component={PostEdit}/>
          <Route path="/posts/:id" component={PostEdit}/>
          <Route path="/categories" component={CategoryList}/>
          <Route path="/categories/:id" component={CategoryEdit}/>
          <Route path="/users" component={UserList}/>
          <Route path="/users/:id" component={UserEdit}/>
        </Route>
        <Route path="/login" component={Login}/>
      </Router>
    );
  }
}
