import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { withResource } from '../../hocs';

export class ProfileEdit extends Component {
  componentWillMount() {
    const { fetchResource, user, resource } = this.props;
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
});

export const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResource('auth.user')(ProfileEdit),
);
