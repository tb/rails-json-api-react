import React, { Component, PropTypes } from 'react';
import { find, keyBy } from 'lodash';

import { Loading } from '../UI';
import { withResourceList } from '../../hocs';
import CategoryForm from './CategoryForm';

export class CategoryList extends Component {
  componentWillMount() {
    this.props.fetchResourceList({ page: { size: 999 } });
  }

  render() {
    const { resourceList, onSubmit, onDelete } = this.props;

    if (resourceList.empty && resourceList.loading) {
      return (<Loading />);
    }

    return (
      <div>
        {resourceList.data.map(category =>
          <div key={category.id}>
            <CategoryForm
              form={`category-${category.id}`}
              initialValues={category}
              onSubmit={onSubmit}
              onDelete={onDelete(category)}
            />
          </div>,
        )}
        <CategoryForm
          isNew={true}
          form="category-new"
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

export default withResourceList('categories')(CategoryList);
