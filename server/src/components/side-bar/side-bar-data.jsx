import React from 'react';

import Icons from '../../resources/icons';

const baseRoute = '/console';
const baseAdminRoute = `${baseRoute}/admin`;
const baseUserRoute = `${baseRoute}/user`;

const SideBarData = (roles) => {
  const routes = [
    {
      title: 'Dashboard',
      icon: <Icons.Dashboard />,
      link: `${baseRoute}/dashboard`
    },
    {
      title: 'Profile',
      icon: <Icons.Profile />,
      link: `${baseRoute}/profile`
    }
  ];
  let adminRoutes = [];
  let userRoutes = [];

  if (roles.includes('ADMIN')) {
    adminRoutes = [
      {
        title: 'Users',
        icon: <Icons.Users />,
        link: `${baseAdminRoute}/users`
      },
      {
        title: 'Analytics',
        icon: <Icons.Analytics />,
        sub: [
          {
            title: 'Graphs',
            icon: <Icons.Graph />,
            link: `${baseAdminRoute}/analytics/graphs`
          },
          {
            title: 'Records',
            icon: <Icons.Records />,
            link: `${baseAdminRoute}/analytics/records`
          }
        ]
      },
      {
        title: 'Create User',
        icon: <Icons.CreateUser />,
        link: `${baseAdminRoute}/utilities/create-user`
      }
    ];
  }

  if (roles.includes('USER')) {
    userRoutes = [
      {
        title: 'Tracking Records',
        icon: <Icons.SecurityGate />,
        link: `${baseUserRoute}/tracking-records`
      }
    ];
  }

  return [...routes, ...adminRoutes, ...userRoutes];
};

export default SideBarData;
