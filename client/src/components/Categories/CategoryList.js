import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { find, keyBy } from 'lodash';

import { withResourceList } from '../../hocs';

export class CategoryList extends Component {
  componentWillMount() {
    this.props.fetchResourceList({ page: { size: 999 } });
  }

  render() {
    const { resourceList } = this.props;

    return (
      <div>
        {resourceList.data.map(category =>
          <div key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </div>,
        )}
      </div>
    );
  }
}

export default withResourceList('categories')(CategoryList);
