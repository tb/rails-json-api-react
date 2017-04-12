import React, { Component } from 'react';
import { readEndpiint } from 'redux-json-api';
import { connect } from 'react-redux';

export class CommentList extends Component {
  render() {
    const { post } = this.props;

    return (
      <div>
        { post.id }
      </div>
    );
  }
};

export default CommentList
