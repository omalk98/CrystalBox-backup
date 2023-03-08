import React from 'react';

import Icons from '../../Resources/Icons';

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
        link: `${baseAdminRoute}/analytics`
      },
      {
        title: 'Utilities',
        icon: <Icons.Utilities />,
        sub: [
          {
            title: 'Create User',
            icon: <Icons.CreateUser />,
            link: `${baseAdminRoute}/utilities/create-user`
          },
          {
            title: 'Reissue RFID',
            icon: <Icons.RFID />,
            link: `${baseAdminRoute}/utilities/reissue-RFID`
          },
          {
            title: 'Lock System',
            icon: <Icons.Lock />,
            link: `${baseAdminRoute}/utilities/lock-system`
          }
        ]
      },
      {
        title: 'Settings',
        icon: <Icons.Settings />,
        sub: [
          {
            title: 'Setting Tool',
            icon: <Icons.Logout />,
            link: '#'
          }
        ]
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
