import React, { Component } from 'react';

export class CommentList extends Component {
  render() {
    const { comments } = this.props;

    return (
      <div>
        {comments.data.map(comment =>
          <div key={comment.id}>
            # { comment.id }
            <p> { comment.attributes.body } </p>
          </div>
        )}
      </div>
    );
  }
};

export default CommentList
