import React from 'react';
import { useSelector } from 'react-redux';

import ClipboardAlert from '../ClipboardAlert';
import NavigationBar from '../NavigationBar';
import SideBar from '../SideBar';

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
