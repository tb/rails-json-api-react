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
  getError,
} from '../store/api';

const withResource = (resourceType, resourceMeta) => (WrappedComponent) => {
  const enhance = compose(
    withHandlers({
      onSubmit: props => (values, meta = {}) => {
        const { params, createResource, updateResource, redirectToIndex } = props;
        const payload = { id: params.id, ...values };
        return (params.id ? updateResource : createResource)(payload, meta)
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
    loading: props.params.id && !getOne(state, resourceType, props.params.id),
    error: props.params.id && getError(state, resourceType),
    resource: getOne(state, resourceType, props.params.id),
  });

  const mapDispatchToProps = dispatch => ({
    fetchResource: (payload, meta) =>
      dispatch(fetchOne(resourceType, payload, { ...resourceMeta, ...meta })),
    createResource: (payload, meta) =>
      dispatch(createResource(resourceType, payload, { ...resourceMeta, ...meta })),
    updateResource: (payload, meta) =>
      dispatch(updateResource(resourceType, payload, { ...resourceMeta, ...meta })),
    deleteResource: (payload, meta) =>
      dispatch(deleteResource(resourceType, payload, { ...resourceMeta, ...meta })),
  });

  return connect(mapStateToProps, mapDispatchToProps)(enhance(WrappedComponent));
};

export default withResource;
