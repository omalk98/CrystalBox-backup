import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Icons from '../../Resources/Icons';

import SideBarData from './SideBarData';

import './SideBar.css';

function SideBarItem({ title, icon, link, sub }) {
  const Active = ({ isActive }) => ({
    backgroundColor: isActive && 'var(--sidebar-hover-bg)',
    boxShadow: isActive && '0 1px 3px black, 0 0 3px black',
    color: isActive && 'var(--sidebar-glow)'
  });

  return (
    <NavLink
      to={link}
      title={title}
      className="sidebar-link"
      style={Active}
    >
      <li className={`sidebar-item sidebar-item-${sub && 'sub'}`}>
        {!sub && <span className="sidebar-glow" />}
        <span className="sidebar-icon">{icon}</span>
        <span className="sidebar-title">{title}</span>
      </li>
    </NavLink>
  );
}

function SideBarSubMenu({ title, icon, sub }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar-link">
      <li className="sidebar-item">
        <button
          type="button"
          title={title}
          className="sidebar-link sidebar-sub-toggle-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sidebar-glow" />
          <span className="sidebar-icon">{icon}</span>
          <span className="sidebar-title">{title}</span>
          {sub && (
            <span className="sidebar-sub-toggle">
              <Icons.Arrow className={isOpen && 'rotate-180'} />
            </span>
          )}
        </button>
        {sub && (
          <ul
            style={{ height: isOpen ? `${62 * sub.length}px` : '0px' }}
            className={`sidebar-items sidebar-sub-menu 
              ${!isOpen && 'sidebar-sub-menu-collapse'}`}
          >
            {sub.map((item, index) => (
              <SideBarItem
                key={index}
                {...item}
                sub
              />
            ))}
          </ul>
        )}
      </li>
    </div>
  );
}

function SideBarSlot({ title, icon, link, sub }) {
  return link && !sub ? (
    <SideBarItem
      title={title}
      icon={icon}
      link={link}
    />
  ) : (
    <SideBarSubMenu
      title={title}
      icon={icon}
      link={link}
      sub={sub}
    />
  );
}

export default function SideBar() {
  const user = useSelector((state) => state.user);
  const roles = useSelector((state) => state.auth?.roles);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="sidebar">
      <button
        type="button"
        className="sidebar-toggle-button"
        onClick={() => setIsOpen((open) => !open)}
      >
        <div
          className={`sidebar-toggle-icon 
          sidebar-toggle-icon-${isOpen ? 'open' : 'hover'}`}
        />
      </button>
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip sidebar content
      </a>
      <nav className={`sidebar ${!isOpen && 'sidebar-collapse'}`}>
        <div className="sidebar-header">
          <div
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex="0"
            className="sidebar-user-bg"
          >
            <span className="sidebar-user-details-popup">
              <h5>
                <u>
                  {user?.user_details?.details?.first_name}
                  &nbsp;
                  {user?.user_details?.details?.last_name}
                </u>
              </h5>
              <hr />
              <div>
                ID #:&nbsp;
                {user?.security_details?.details?.id}
              </div>
              <div>
                Username:&nbsp;
                {user?.user_details?.details?.username}
              </div>
              <div>{user?.user_details?.details?.email}</div>
              <div>
                Security Level:&nbsp;
                {user?.security_details?.details?.security_level}
              </div>
            </span>

            {(user?.personal_details?.user_image && (
              <img
                src={user?.personal_details?.user_image}
                loading="lazy"
                alt="user-img"
                className="sidebar-user-img"
              />
            )) || <Icons.User className="sidebar-user-img" />}
          </div>

          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {user?.user_details?.details?.first_name}
              &nbsp;
              {user?.user_details?.details?.last_name}
            </div>
          </div>
        </div>
        <hr />
        <ul className="sidebar-items">
          {SideBarData(roles).map((item, index) => (
            <SideBarSlot
              key={index}
              {...item}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
