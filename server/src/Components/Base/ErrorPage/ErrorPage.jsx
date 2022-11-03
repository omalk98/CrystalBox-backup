import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { setTitle } from '../../Common';

export default function ErrorPage({ type }) {
  const navigate = useNavigate();
  const location = useLocation();

  const link = location.state?.from?.pathname || '/';
  let text = '';
  switch (type) {
    case '403':
      setTitle('403 Forbidden');
      text = 'You are not allowed to view this page.';
      break;
    default:
      setTitle('404 Page Not Found');
      text = 'The page you are looking for does not exist.';
      break;
  }
  return (
    <Alert
      className="mt-5"
      variant="danger"
      onClick={() => navigate(link, { replace: true })}
    >
      {text}
    </Alert>
  );
}
