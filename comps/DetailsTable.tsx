import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  padding: 0 0 1em;
  width: 100%;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border: none;
  }

  & th {
    padding: 1em 0;
    text-align: left;
    font-weight: normal;
  }

  & td {
    padding: 1em 0;
    text-align: right;
  }
`;

const DetailsTable = (props: React.ComponentPropsWithoutRef<'table'>) => {
  return <Table>{props.children}</Table>;
};

export default DetailsTable;
