import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { get, find, isEmpty, omitBy } from 'lodash';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import {
  fetchList,
  getList,
} from '../store/api';

const withResourceList = resourceKey => (WrappedComponent) => {
  const enhance = compose(
    withHandlers({
      onFilter: props => (filter) => {
        const { resourceList: { params }, fetchResourceList } = props;
        const { page: { size } } = params;
        const number = 1;
        fetchResourceList({ ...params, page: { number, size }, filter: omitBy(filter, isEmpty) });
      },
      onSort: props => (event) => {
        const { resourceList: { params }, fetchResourceList } = props;
        const sort = event.target.value;
        fetchResourceList({ ...params, sort });
      },
      onPageSize: props => (event) => {
        const { resourceList: { params }, fetchResourceList } = props;
        const size = event.target.value;
        const number = 1;
        fetchResourceList({ ...params, page: { number, size } });
      },
      onPageNumber: props => number => {
        const { resourceList: { params }, fetchResourceList } = props;
        const { page = {} } = params;
        fetchResourceList({ ...params, page: { ...page, number } });
      },
    }),
  );

  const mapStateToProps = (state, props) => ({
    resourceList: getList(state, resourceKey),
  });

  const mapDispatchToProps = dispatch => ({
    fetchResourceList: (params = {}) => dispatch(fetchList(resourceKey, params)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(enhance(WrappedComponent));
};

export default withResourceList;
