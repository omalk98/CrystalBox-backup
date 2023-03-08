import React from 'react';

import Icons from '../../../resources/icons';

const DashboardCards = (data) => [
  {
    title: 'Revenue',
    text: data?.[0],
    color: 'red',
    icon: <Icons.Dollar />
  },
  {
    title: 'Entries Today',
    text: data?.[1],
    color: 'yellow',
    icon: <Icons.Person />
  },
  {
    title: 'Main Gate Usage',
    text: data?.[2],
    color: 'blue',
    icon: <Icons.StatLine />
  },
  {
    title: 'Tasks',
    text: data?.[3],
    color: 'green',
    icon: <Icons.EditNote />
  }
];

export default DashboardCards;
