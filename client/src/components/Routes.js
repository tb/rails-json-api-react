import React, { PureComponent, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import { PostList } from './Posts';

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
        </Route>
      </Router>
    );
  }
}
