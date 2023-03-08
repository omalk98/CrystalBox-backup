import React, { useState, useRef } from 'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Requests from '../../requests';
import { authenticateUser, setUser } from '../../store/actions';
import Icons from '../../resources/icons';

import './login.css';

const isMobile = navigator.userAgent.match(
  /Android|webOS|iPhone|iPod|Blackberry/i
);

function LoginPage({ from }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const password = useRef();
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem('c_box_remember_me') === 'true'
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleRememberMe = () => {
    if (rememberMe) localStorage.removeItem('c_box_remember_me');
    else localStorage.setItem('c_box_remember_me', !rememberMe);
    setRememberMe((rm) => !rm);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await Requests.Public.Post.userLogin({
        username: username.replace(/^\s+|\s+$/g, ''),
        password: password.current?.value.replace(/^\s+|\s+$/g, ''),
        rememberMe
      });
      if (res.status !== 200) throw new Error('Invalid Credentials');
      dispatch(authenticateUser(res.data?.auth));
      dispatch(setUser(res.data?.user));
      navigate(from, { replace: true });
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div
        className="login-page"
        style={{ height: isMobile ? 'auto' : '100vh' }}
      >
        <div className="login-page-tint">
          <div className="login-page-content">
            <div className="login-card">
              <Row className="justify-content-center">
                <div className="mb-5">
                  <Icons.Logo className="login-icon" />
                  <h1 className="login-title"> Crystal Box </h1>
                </div>
              </Row>
              <Row className="justify-content-center">
                <div className="login-wrap w-100">
                  <h3 className="login-prompt">Enter the Box!</h3>

                  <Form
                    className="login-form"
                    onSubmit={login}
                  >
                    <Form.Group>
                      <Form.Control
                        className="login-input glow-blue"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                      />
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Control
                        className="login-input glow-blue"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        style={{ paddingRight: '50px' }}
                        ref={password}
                        required
                      />
                      <button
                        type="button"
                        className="eye-icon clear-input"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Icons.Visible className="mt-1" />
                        ) : (
                          <Icons.Hidden className="mt-1" />
                        )}
                      </button>
                    </Form.Group>
                    <br />
                    {error && (
                      <Alert
                        variant="danger"
                        className="login-error mx-auto"
                        dismissible
                        onClose={() => setError(false)}
                      >
                        Invalid Username or Password
                      </Alert>
                    )}
                    <Form.Group>
                      <Button
                        type="submit"
                        className="login-input login-input-btn"
                      >
                        Sign In
                        {loading ? (
                          <Icons.LoadingCog className="spin-clockwise" />
                        ) : (
                          <Icons.Login />
                        )}
                      </Button>
                    </Form.Group>
                    <br />
                    <Form.Group className="d-md-flex justify-content-center">
                      <div className="w-100 my-2">
                        <Form.Check
                          type="switch"
                          label="Remember Me"
                          checked={rememberMe}
                          bsPrefix="none"
                          onChange={toggleRememberMe}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') toggleRememberMe();
                          }}
                        />
                      </div>
                      <div className="w-100 my-2 text-md-right">
                        <Link
                          to={`/forgot-password?email=${username || ''}`}
                          style={{ color: '#fff' }}
                        >
                          Forgot Password ?
                        </Link>
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const location = useLocation();
  const fromLoc = location.state?.from?.pathname || '/console/dashboard';

  return auth ? (
    <Navigate
      to={fromLoc}
      replace
    />
  ) : (
    <LoginPage from={fromLoc} />
  );
}
