import React from 'react';
import { useSelector } from 'react-redux';

import ClipboardAlert from '../clipboard-alert';
import NavigationBar from '../navigation-bar';
import SideBar from '../side-bar';

export default function Header() {
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  return (
    <header id="header">
      <ClipboardAlert />
      <NavigationBar />
      {auth && <SideBar />}
    </header>
  );
}
