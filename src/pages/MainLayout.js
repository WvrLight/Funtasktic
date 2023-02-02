import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavBar from './MainNavBar';

export default function MainLayout() {
  return (
    <div className="MainLayout">
      <MainNavBar />
      <Outlet />
    </div>
  )
}
