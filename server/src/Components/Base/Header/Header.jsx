import React from 'react';
import { useSelector } from 'react-redux';

import ClipboardAlert from './ClipboardAlert/ClipboardAlert';
import NavigationBar from './NavigationBar/NavigationBar';
import SideBar from './SideBar/SideBar';

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
