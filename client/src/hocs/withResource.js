import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { get, find, omit } from 'lodash';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import {
  fetchOne,
  createResource,
  updateResource,
  deleteResource,
  getOne,
} from '../store/api';

const withResource = resourceKey => (WrappedComponent) => {
  const enhance = compose(
    withHandlers({
      onSubmit: props => (values) => {
        const { params, createResource, updateResource, redirectToIndex } = props;

        const payload = {
          id: params.id,
          ...values,
        };

        return (params.id ? updateResource : createResource)(payload)
          .then(redirectToIndex)
          .catch((errors) => { throw new SubmissionError(errors); });
      },

      onDelete: props => (e) => {
        const { deleteResource, resource, redirectToIndex } = props;
        e.preventDefault();
        deleteResource(resource).then(redirectToIndex);
      },
    }),
  );

  const mapStateToProps = (state, props) => ({
    isNew: !props.params.id,
    resource: getOne(state, resourceKey, props.params.id),
  });

  const mapDispatchToProps = dispatch => ({
    fetchResource: payload => dispatch(fetchOne(resourceKey, payload)),
    createResource: payload => dispatch(createResource(resourceKey, payload)),
    updateResource: payload => dispatch(updateResource(resourceKey, payload)),
    deleteResource: payload => dispatch(deleteResource(resourceKey, payload)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(enhance(WrappedComponent));
};

export default withResource;
