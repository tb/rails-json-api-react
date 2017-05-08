import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { Loading, Pagination } from './';

const columnKey = (column, postfix) => `${column.accessor || column.header}-${postfix}`;

export default (props) => {
  const { columns, resourceList, onPageSize, onPageNumber, onSort } = props;
  const { sort } = resourceList.params;
  const sortedAsc = sort && sort[0] !== '-';

  const sorted = attribute => attribute === sort || `-${attribute}` === sort;

  const toggleSort = attribute => (e) => {
    if (attribute === sort) {
      onSort(sortedAsc ? `-${attribute}` : attribute);
    } else {
      onSort(attribute);
    }
  };


  if (resourceList.empty && resourceList.loading) {
    return (<Loading />);
  }

  return (
    <div>
      <Table>
        <thead>
        <tr>
          {columns.map(column =>
            <th
              key={columnKey(column, 'header')}
              style={{ minWidth: column.minWidth }}
              onClick={column.sortable && toggleSort(column.attribute)}
            >
              {column.header}&nbsp;
              {column.sortable && !sorted(column.attribute) && <i className="fa fa-sort"></i>}
              {column.sortable && sorted(column.attribute) && !sortedAsc && <i className="fa fa-sort-desc"></i>}
              {column.sortable && sorted(column.attribute) && sortedAsc && <i className="fa fa-sort-asc"></i>}
            </th>,
          )}
        </tr>
        </thead>
        <tbody>
        {resourceList.data.map(item =>
          <tr key={item.id}>
            {columns.map(column =>
              <td key={columnKey(column, 'row')} style={{ minWidth: column.minWidth }}>
                {column.rowRender ? column.rowRender(item) : item[column.attribute]}
              </td>,
            )}
          </tr>,
        )}
        </tbody>
      </Table>
      <Pagination
        resourceList={resourceList}
        onPageNumber={onPageNumber}
        onPageSize={onPageSize}>
      </Pagination>
    </div>
  );
};
