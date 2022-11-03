import React from 'react';
import Icons from '../../../../../Resources/Icons';

const PaginationButtons = (page, max) => [
  {
    value: 1,
    title: 'first',
    condition: page === 1,
    icon: <Icons.EndPage />
  },
  {
    value: page - 1,
    title: 'previous',
    condition: page === 1,
    icon: <Icons.NextPage />
  },
  {
    value: page,
    title: 'current',
    condition: true,
    icon: page
  },
  {
    value: page + 1,
    title: 'next',
    condition: page === max,
    icon: <Icons.NextPage className="rotate-180" />
  },
  {
    value: max,
    title: 'last',
    condition: page === max,
    icon: <Icons.EndPage className="rotate-180" />
  }
];

export default PaginationButtons;
