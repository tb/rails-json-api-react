import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { get, find, isEmpty, omitBy } from 'lodash';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import {
  fetchList,
  createResource,
  updateResource,
  deleteResource,
  getList,
} from '../store/api';

const withResourceList = (resourceType, resourceMeta) => (WrappedComponent) => {
  const enhance = compose(
    withHandlers({
      onFilter: props => (filter) => {
        const { resourceList: { params }, fetchResourceList } = props;
        const { page: { size } } = params;
        const number = 1;
        fetchResourceList({ ...params, page: { number, size }, filter: omitBy(filter, isEmpty) });
      },
      onSort: props => (sort) => {
        const { resourceList: { params }, fetchResourceList } = props;
        fetchResourceList({ ...params, sort });
      },
      onPageSize: props => (event) => {
        const { resourceList: { params }, fetchResourceList } = props;
        const size = event.target.value;
        const number = 1;
        fetchResourceList({ ...params, page: { number, size } });
      },
      onPageNumber: props => (number) => {
        const { resourceList: { params }, fetchResourceList } = props;
        const { page = {} } = params;
        fetchResourceList({ ...params, page: { ...page, number } });
      },
      onSubmit: props => (values, meta = {}) => {
        const { createResource, updateResource } = props;
        return (values.id ? updateResource : createResource)(values, { list: 'list', ...meta })
          .catch((errors) => { throw new SubmissionError(errors); });
      },
      onDelete: props => resource => (e) => {
        const { deleteResource } = props;
        e.preventDefault();
        deleteResource(resource);
      },
    }),
  );

  const mapStateToProps = (state, props) => ({
    resourceList: getList(state, resourceType),
  });

  const mapDispatchToProps = dispatch => ({
    fetchResourceList: (payload, meta) =>
      dispatch(fetchList(resourceType, payload, { ...resourceMeta, ...meta })),
    createResource: (payload, meta) =>
      dispatch(createResource(resourceType, payload, { ...resourceMeta, ...meta })),
    updateResource: (payload, meta) =>
      dispatch(updateResource(resourceType, payload, { ...resourceMeta, ...meta })),
    deleteResource: (payload, meta) =>
      dispatch(deleteResource(resourceType, payload, { ...resourceMeta, ...meta })),
  });

  return connect(mapStateToProps, mapDispatchToProps)(enhance(WrappedComponent));
};

export default withResourceList;
