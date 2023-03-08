import React from 'react';
import { useSelector } from 'react-redux';

import Icons from '../../resources/icons';
import { PageTab } from '../../components/common';
import UserProfile from '../../components/user-profile';

export default function Profile() {
  const userData = useSelector((state) => state.user);
  return (
    <PageTab
      title="Profile"
      icon={<Icons.Profile />}
    >
      <UserProfile userData={userData} />
    </PageTab>
  );
}
