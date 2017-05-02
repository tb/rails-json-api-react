import React, { Component } from 'react';
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination';
import { Input, Label } from 'reactstrap';

const WrapperComponent = ({ children }) => (
  <ul className="pagination">{children}</ul>
);

const withPreventDefault = fn => (event) => {
  event.preventDefault();
  fn();
};

const Page = ({ value, isActive, onClick }) => (
  <li className={isActive ? 'page-item active' : 'page-item'}>
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>{value}</a>
  </li>
);

const createPageLink = children => ({ onClick }) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>{children}</a>
  </li>
);

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: createPageLink('...'),
  [ITEM_TYPES.FIRST_PAGE_LINK]: createPageLink(<span>&laquo;</span>),
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: createPageLink(<span>&lsaquo;</span>),
  [ITEM_TYPES.NEXT_PAGE_LINK]: createPageLink(<span>&rsaquo;</span>),
  [ITEM_TYPES.LAST_PAGE_LINK]: createPageLink(<span>&raquo;</span>),
};

const UltimatePaginationBootstrap4 = createUltimatePagination({
  itemTypeToComponent,
  WrapperComponent,
});

export default (props) => {
  const { resourceList, onPageSize, onPageNumber } = props;
  const { page } = resourceList.params || {};
  const { size, number } = page || {};
  const { total = 1 } = resourceList.meta || {};
  const currentPage = number || 1;
  const totalPages = Math.ceil(total / (size || 10));

  if (totalPages < 2) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center" style={{ height: '50px' }}>
      <UltimatePaginationBootstrap4
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onPageNumber}
      />
      <Label
        for="perPage"
        className="align-self-center"
        style={{ marginLeft: '20px', padding: '8px' }}>Per Page</Label>
      <Input type="select" name="perPage" value={size} onChange={onPageSize} style={{ width: '60px' }}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Input>
    </div>
  );
};
