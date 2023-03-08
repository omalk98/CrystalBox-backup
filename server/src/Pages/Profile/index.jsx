import React from 'react';
import { useSelector } from 'react-redux';

import Icons from '../../Resources/Icons';
import { PageTab } from '../../Components/Common';
import UserProfile from '../../Components/UserProfile';

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
