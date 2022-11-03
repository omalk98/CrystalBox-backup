import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Requests from '../../../../Requests';
import Icons from '../../../../Resources/Icons';
import {
  setClipboard,
  updatePersonalDetails,
  updateUserDetails
} from '../../../../Store/Actions';
import {
  capitalizeFirst,
  formatDate,
  formatPhone,
  getInputType,
  Loader,
  ProvinceListOptions
} from '../../../Common';
import Schemas from './validation';

import './UserProfile.css';

function DoubleButton({ title, icon, loading, handleFail }) {
  return (
    <span className="btn-container">
      <button
        type="submit"
        title={title}
        className="detail-input detail-input-btn dbl-btn-success"
      >
        {loading ? <Icons.LoadingLine className="spin-clockwise" /> : icon}
      </button>
      <button
        type="button"
        title="cancel"
        className="detail-input detail-input-btn dbl-btn-fail"
        onClick={handleFail && handleFail}
      >
        <Icons.Close />
      </button>
    </span>
  );
}

function FormInput({ title }) {
  const type = getInputType(title);

  return (
    <>
      {type === 'select' ? (
        <Field
          id={title}
          name={title}
          className="detail-input glow-red"
          as={type}
        >
          {ProvinceListOptions}
        </Field>
      ) : (
        <Field
          id={title}
          name={title}
          className="detail-input glow-red"
          type={type}
        />
      )}
      <div className="detail-error">
        <ErrorMessage name={title} />
      </div>
    </>
  );
}

function DisplayField({ title, text }) {
  let displayText = '';
  if (title.includes('date') || title.includes('time')) {
    displayText = formatDate(text);
  } else if (title.includes('phone')) displayText = formatPhone(text);
  else if (typeof text === 'boolean') {
    displayText = text ? 'Yes' : 'No';
  } else if (text instanceof Array) displayText = text.join(' - ');
  else displayText = text;

  return (
    <div className="detail-text-container">
      <p
        id={title}
        className="detail-text"
      >
        {displayText}
      </p>
    </div>
  );
}

function DetailSection({ titleList, text, editMode }) {
  const dispatch = useDispatch();

  // prettier-ignore
  return titleList ? (
    <div className="user-detail-form-fields">
      {titleList.map((title, i) =>
        (typeof text[i] === 'object' || text[i] instanceof Object) &&
        !(text[i] instanceof Array) ? (
          <div key={title}>
            <hr />
            <h4>
              <b>{capitalizeFirst(title)}</b>
            </h4>
            <br />
            <DetailSection
              editMode={editMode}
              titleList={Object.keys(text[i]).map((key) => `${title}.${key}`)}
              text={Object.values(text[i])}
            />
            <hr />
          </div>
          ) : (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              key={i}
              type="button"
              title="copy-to-clipboard"
              className="form-group user-detail-form-field"
              onClick={() => !editMode && dispatch(setClipboard(text[i]))}
              onKeyDown={(e) =>
                e.key === 'Enter' && !editMode && dispatch(setClipboard(text[i]))
              }
            >
              <label htmlFor={title}>
                {title.includes('.')
                  ? capitalizeFirst(title.split('.')[1], '_')
                  : capitalizeFirst(title, '_')}
              </label>
              {editMode ? (
                <FormInput title={title} />
              ) : (
                <DisplayField
                  title={title}
                  text={text[i]}
                />
              )}
            </div>
          ))
      }
    </div>
  ) : (
    <div />
  );
}

function ProfileHeader({ userImg }) {
  return (
    <div className="profile-user-wrapper">
      <div className="profile-user-bg">
        {userImg ? (
          <img
            src={userImg}
            alt="user"
            className="profile-user-img"
            loading="lazy"
          />
        ) : (
          <Icons.User className="profile-user-img" />
        )}
      </div>
      <div className="profile-user-glow-bar" />
    </div>
  );
}

function ProfileForm({
  title,
  details,
  isEditable,
  isOtherUser,
  userID,
  nextRef
}) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(details);
  const dispatch = useDispatch();
  const privateRequest = Requests.Private.Hook();
  let validationSchema = null;

  if (title.includes('user')) validationSchema = Schemas.UserDetailsSchema;
  else if (title.includes('personal')) {
    validationSchema = Schemas.PersonalDetailsSchema;
  }

  const postDetails = async (values, actions) => {
    setLoading(true);
    if (
      editMode &&
      // eslint-disable-next-line no-restricted-globals, no-alert
      confirm(
        `Are you sure you want to update ${
          isOtherUser ? '"The User\'s"' : '"Your"'
        } details?`
      )
    ) {
      const data = values;
      let res;
      if (isOtherUser) data.id = userID;
      if (title.includes('user')) {
        try {
          if (isOtherUser) {
            res = await privateRequest(
              Requests.Private.Put.adminUserDetails(values)
            );
          } else {
            res = await privateRequest(
              Requests.Private.Put.userDetails(values)
            );
          }
          if (res.status !== 200) {
            throw new Error('Error updating user details');
          }
          delete data.id;
          if (!isOtherUser) dispatch(updateUserDetails(data));
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert('Failed to update details');
        }
      } else if (title.includes('personal')) {
        if (isOtherUser) {
          res = await privateRequest(
            Requests.Private.Put.adminPersonalDetails(values)
          );
        } else {
          res = await privateRequest(
            Requests.Private.Put.personalDetails(values)
          );
        }
        try {
          if (res.status !== 200) {
            throw new Error('Error updating personal details');
          }
          delete data.id;
          if (!isOtherUser) dispatch(updatePersonalDetails(data));
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert('Failed to update details');
        }
      }
      setFields(values);
      setEditMode(false);
    }

    actions.setSubmitting(false);
    setLoading(false);
  };

  return (
    <Formik
      initialValues={isOtherUser ? fields : details}
      validationSchema={validationSchema}
      onSubmit={postDetails}
    >
      <div className={`user-detail-wrapper ${editMode ? 'edit-mode-bg' : ''}`}>
        <label
          id={title}
          htmlFor={`${title}-link`}
        >
          <a
            id={`${title}-link`}
            tabIndex="0"
            href={`#${nextRef}`}
            className="skip-link"
          >
            Skip&nbsp;
            {capitalizeFirst(title, '_')}
            &nbsp;form
          </a>
        </label>
        <Form className="user-detail-form">
          <div className="form-group profile-user-detail-header">
            <h3 className="profile-user-detail-title">
              <b>{capitalizeFirst(title, '_')}</b>
            </h3>
            {isEditable && (
              <span className="profile-user-detail-buttons">
                {editMode ? (
                  <DoubleButton
                    title="save"
                    icon={<Icons.Save />}
                    loading={loading}
                    handleFail={() => setEditMode(false)}
                  />
                ) : (
                  <span className="btn-container">
                    <button
                      title="edit"
                      type="button"
                      onClick={() => setEditMode(true)}
                      className="detail-input detail-input-btn"
                    >
                      <Icons.Edit />
                    </button>
                  </span>
                )}
              </span>
            )}
          </div>
          <hr />
          <DetailSection
            editMode={editMode}
            titleList={details && Object.keys(isOtherUser ? fields : details)}
            text={details && Object.values(isOtherUser ? fields : details)}
          />
        </Form>
      </div>
    </Formik>
  );
}

function ResetPassword({ isOtherUser, userID }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const privateRequest = Requests.Private.Hook();
  const passwordModal = {
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  };

  const resetPassword = async (values, actions) => {
    if (
      // eslint-disable-next-line no-restricted-globals, no-alert
      confirm(
        `Are you sure you want to reset ${
          isOtherUser ? '"The User\'s"' : '"Your"'
        } password?`
      )
    ) {
      const data = values;
      let res;
      if (isOtherUser) data.id = userID;
      setLoading(true);
      try {
        if (isOtherUser) {
          res = await privateRequest(
            Requests.Private.Put.adminResetPassword(data)
          );
        } else {
          res = await privateRequest(Requests.Private.Put.resetPassword(data));
        }
        if (res.status !== 200) {
          throw new Error('Error resetting password');
        }
        setIsOpen(false);
      } catch {
        // eslint-disable-next-line no-alert
        alert('Failed to reset password');
      }
    }

    actions.setSubmitting(false);
    actions.resetForm();
    setLoading(false);
  };

  return (
    <div
      className="reset-password mx-auto"
      style={{
        height: isOpen && !isOtherUser ? '570px' : '40px',
        marginBottom: !isOpen ? '150px' : '0px'
      }}
    >
      <Formik
        initialValues={passwordModal}
        validationSchema={Schemas.UserPasswordSchema}
        onSubmit={resetPassword}
      >
        <Form>
          <div className="users-options">
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              type={isOpen ? 'button' : 'reset'}
              className="clear-input hover-black glow-red"
              onClick={() => (!isOtherUser ? setIsOpen((prev) => !prev) : null)}
            >
              {isOpen && !isOtherUser ? (
                <>
                  <Icons.Close />
                  &nbsp;&nbsp;Cancel
                </>
              ) : (
                <>
                  {loading ? <Icons.LoadingLine /> : <Icons.Password />}
                  &nbsp;&nbsp;Reset Password
                </>
              )}
            </button>
          </div>
          {!isOtherUser ? (
            <>
              {Object.keys(passwordModal).map((field, i) => (
                <div
                  key={i}
                  className="user-detail-form-field"
                >
                  <label htmlFor={field}>{capitalizeFirst(field, '_')}</label>
                  <Field
                    required
                    name={field}
                    type="password"
                    className="detail-input glow-red"
                  />
                  <div className="detail-error detail-error-center">
                    <ErrorMessage name={field} />
                  </div>
                </div>
              ))}
              <div className="users-options">
                <button
                  type="submit"
                  className="clear-input hover-black glow-green"
                >
                  {loading ? <Icons.LoadingLine /> : <Icons.Password />}
                  &nbsp;&nbsp;Change Password
                </button>
              </div>
            </>
          ) : null}
        </Form>
      </Formik>
    </div>
  );
}

export default function UserProfile({ userData, isOtherUser }) {
  const keys = Object.keys(userData);
  const values = Object.values(userData);
  const location = useLocation();
  const userID = isOtherUser
    ? location.pathname.split('/').pop()
    : useSelector((state) => state?.user?.security_details?.details?.id);

  return userData ? (
    <div>
      <ProfileHeader userImg={userData?.personal_details?.user_image} />
      <ResetPassword
        isOtherUser={isOtherUser}
        userID={userID}
      />
      <section className="profile-user-detail-section">
        {userData
          ? values.map((data, i) => (
              // eslint-disable-next-line react/jsx-indent
              <ProfileForm
                key={i}
                title={keys[i]}
                nextRef={keys[i + 1] || 'footer'}
                isOtherUser={isOtherUser}
                userID={userID}
                {...data}
              />
              // eslint-disable-next-line indent
            ))
          : null}
      </section>
    </div>
  ) : (
    <Loader
      variant="success"
      animation="border"
    />
  );
}
