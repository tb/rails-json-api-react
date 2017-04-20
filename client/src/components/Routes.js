import React, { PureComponent, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions, replace } from 'react-router-redux';

import App from './App';
import { PostList, PostEdit } from './Posts';
import { CategoryList, CategoryEdit } from './Categories';
import { UserList, UserEdit } from './Users';
import { Login } from './Auth';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.api.user, // how to get the user state
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})


export default class Routes extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    const { history } = this.props;

    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={UserIsAuthenticated(PostList)}/>
          <Route path="/posts" component={UserIsAuthenticated(PostList)}/>
          <Route path="/posts/new" component={UserIsAuthenticated(PostEdit)}/>
          <Route path="/posts/:id" component={UserIsAuthenticated(PostEdit)}/>
          <Route path="/categories" component={UserIsAuthenticated(CategoryList)}/>
          <Route path="/categories/:id" component={UserIsAuthenticated(CategoryEdit)}/>
          <Route path="/users" component={UserIsAuthenticated(UserList)}/>
          <Route path="/users/:id" component={UserIsAuthenticated(UserEdit)}/>
          <Route path="/login" component={Login}/>
        </Route>
      </Router>
    );
  }
}
