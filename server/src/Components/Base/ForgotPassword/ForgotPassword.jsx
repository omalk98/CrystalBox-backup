import React, { useRef, useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { PageTab } from '../../Common';
import Icons from '../../../Resources/Icons';
import Requests from '../../../Requests';

export default function ForgotPassword() {
  const emailField = useRef();
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = new URLSearchParams(location?.search).get('email');
  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      if (!emailField.current?.value) return;
      setLoading(true);
      setMessage({});
      const res = await Requests.Public.Get.forgotPassword(
        emailField.current?.value || email
      );
      if (res.status !== 200) throw new Error("Couldn't send email");
      setMessage({
        variant: 'success',
        text: 'If the E-Mail exists, a password reset link will be sent to it'
      });
      setLoading(false);
    } catch {
      setMessage({
        variant: 'danger',
        text: 'Failed to send E-Mail'
      });
      setLoading(false);
    }
  };
  return (
    <PageTab title="Forgot Password">
      <div className="user-detail-wrapper m-auto">
        <Form
          className="user-detail-from"
          onSubmit={forgotPassword}
        >
          <Form.Group>
            <Form.Label>Enter E-Mail</Form.Label>
            <Form.Control
              className="clear-input glow-blue"
              type="email"
              placeholder="e-mail"
              ref={emailField}
              defaultValue={email}
              required
              autoFocus
            />
          </Form.Group>

          <br />
          <br />

          <Form.Group className="users-options">
            <button
              type="submit"
              className="clear-input glow-green"
            >
              Send Link &nbsp;
              {loading ? (
                <Icons.LoadingCog className="spin-clockwise" />
              ) : (
                <Icons.Email />
              )}
            </button>
          </Form.Group>
        </Form>
      </div>
      <br />
      {message.text ? (
        <Alert variant={message.variant}>{message.text}</Alert>
      ) : null}
    </PageTab>
  );
}
