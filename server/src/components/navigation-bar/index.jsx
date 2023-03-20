import React from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import useLogout from '../../hooks/useLogout';
import { toggleTheme } from '../../store/actions';
import Icons from '../../resources/icons';
import MainPages from './nav-bar-data';

import './nav-bar.css';

export default function NavigationBar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Do nothing
    }
  };

  return (
    <Navbar
      className="shadow"
      bg={theme}
      variant={theme}
      expand="lg"
      fixed="top"
    >
      <a
        href="#sidebar"
        className="skip-link"
      >
        Skip navigation content
      </a>
      <Container fluid>
        <Link
          to="/"
          className="navbar-brand-link"
        >
          <Icons.Logo className="navbar-brand-icon spin-color" />
          <Navbar.Brand>
            <b>CrystalBox&#174;</b>
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="me-auto">
            {MainPages.map((item, index) => (
              <LinkContainer
                key={index}
                to={item.link}
              >
                <Nav.Link>
                  <span className="mx-1">{item.icon}</span>
                  {item.title}
                </Nav.Link>
              </LinkContainer>
            ))}
          </Nav>

          <div className="color-toggle d-flex mx-4 my-2 justify-content-center">
            <Icons.Sun
              className={`mt-1 ${
                theme === 'light' ? 'spin-clockwise-once' : ''
              }`}
            />
            <Form.Check
              className="mx-2"
              defaultChecked={theme === 'dark'}
              type="switch"
              onChange={() => dispatch(toggleTheme(theme))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') dispatch(toggleTheme(theme));
              }}
            />
            <Icons.Moon
              className={`mt-1 ${theme === 'dark' ? 'spin-yaxis-once' : ''}`}
            />
          </div>
          {auth ? (
            <Button
              variant="danger"
              className="mx-2"
              onClick={handleLogout}
            >
              <Icons.Logout />
              &nbsp;Logout
            </Button>
          ) : (
            <LinkContainer to="/login">
              <Button
                variant="success"
                className="mx-2"
              >
                <Icons.Login />
                &nbsp;Login
              </Button>
            </LinkContainer>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
