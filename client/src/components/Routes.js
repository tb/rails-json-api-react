import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash';
import { Router, Route, IndexRoute } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import { getUser } from '../store/auth';
import App from './App';
import Dashboard from './Dashboard';
import { PostList, PostEdit } from './Posts';
import { CategoryList } from './Categories';
import { UserList, UserEdit } from './Users';
import { CustomerList, CustomerEdit } from './Customers';
import { Login } from './Auth';
import { OrderList, OrderEdit } from './Orders';
import { ProductList, ProductEdit } from './Products';

const UserIsAuthenticated = UserAuthWrapper({ authSelector: getUser });
const UserIsAdmin = UserAuthWrapper({
  authSelector: getUser,
  predicate: user => get(user, 'roles', []).includes('admin'),
});

export class Routes extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
  };

  render() {
    const { history } = this.props;

    return (
      <Router history={history}>
        <Route path="/" component={UserIsAuthenticated(App)}>
          <IndexRoute component={Dashboard}/>
          <Route path="/orders" component={OrderList}/>
          <Route path="/orders/new" component={OrderEdit}/>
          <Route path="/orders/:id" component={OrderEdit}/>
          <Route path="/posts" component={PostList}/>
          <Route path="/posts/new" component={PostEdit}/>
          <Route path="/posts/:id" component={PostEdit}/>
          <Route path="/categories" component={CategoryList}/>
          <Route path="/users" component={UserIsAdmin(UserList)}/>
          <Route path="/users/:id" component={UserIsAdmin(UserEdit)}/>
          <Route path="/products" component={ProductList}/>
          <Route path="/products/new" component={ProductEdit}/>
          <Route path="/products/:id" component={ProductEdit}/>
          <Route path="/customers" component={UserIsAdmin(CustomerList)}/>
          <Route path="/customers/new" component={UserIsAdmin(CustomerEdit)}/>
          <Route path="/customers/:id" component={UserIsAdmin(CustomerEdit)}/>
        </Route>
        <Route path="/login" component={Login}/>
      </Router>
    );
  }
}

export default Routes;
