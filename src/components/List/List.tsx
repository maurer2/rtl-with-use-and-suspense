import React from 'react';
import { use } from 'react';

type ListProps = {
  itemsPromise: Promise<number[]>;
};

function List({ itemsPromise }: ListProps) {
  const items = use(itemsPromise);

  return (
    <ul aria-label="List of numbers">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default List;
