import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Alert } from 'react-bootstrap';

import Requests from '../../../../requests';
import Icons from '../../../../resources/icons';
import {
  PageTab,
  getInputType,
  capitalizeFirst,
  ProvinceListOptions
} from '../../../../components';
import UserModel, { UserSchema } from './user-model';

function FormField({ title, prefix }) {
  const type = getInputType(title);

  return (
    <div className="user-detail-form-field">
      <label htmlFor={prefix}>{capitalizeFirst(title, '_')}</label>
      <div
        style={{ paddingRight: '10px' }}
        className={type === 'number' ? 'number-input-container' : ''}
      >
        {type === 'select' ? (
          <Field
            id={title}
            name={title}
            className="detail-input glow-yellow"
            as={type}
          >
            {ProvinceListOptions}
          </Field>
        ) : (
          <Field
            id={prefix}
            className="detail-input glow-yellow"
            name={prefix}
            type={type}
          />
        )}
      </div>
      <div className="detail-error detail-error-small-vertical">
        <ErrorMessage name={prefix} />
      </div>
    </div>
  );
}

function FormFields({ data, prefix, depth = 0 }) {
  const pref = prefix.split('.').pop();
  if (
    (data instanceof Object || typeof data === 'object') &&
    !(data instanceof Array)
  ) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    return (
      <>
        <hr />
        <h3
          style={
            !depth
              ? { textAlign: 'left', fontWeight: 'bold', fontSize: '30pt' }
              : null
          }
        >
          {capitalizeFirst(pref, '_')}
        </h3>
        <br />
        {keys?.map((fields, i) => (
          <FormFields
            key={`${pref}-${fields}`}
            data={values[i]}
            prefix={`${prefix}.${fields}`}
            depth={depth + 1}
          />
        ))}
        <hr style={!depth ? { marginBottom: '50px' } : null} />
      </>
    );
  } else {
    return (
      <FormField
        title={pref}
        prefix={prefix}
      />
    );
  }
}

export default function CreateUser() {
  const [message, setMessage] = React.useState({});
  const keys = Object.keys(UserModel);
  const vals = Object.values(UserModel);

  const privateRequest = Requests.Private.Hook();

  const createUser = async (values, actions) => {
    setMessage({});
    try {
      const res = await privateRequest(
        Requests.Private.Post.createUser(values)
      );
      if (res.status !== 201) throw new Error('Session expired');
      setMessage({
        text: 'Created user successfully',
        variant: 'success'
      });
      actions.resetForm();
    } catch {
      setMessage({ text: 'Failed to create user', variant: 'danger' });
    }
    actions.setSubmitting(false);
  };

  return (
    <PageTab
      type="admin"
      sub="utils"
      title="Create User"
      icon={<Icons.CreateUser />}
    >
      <div className="user-detail-wrapper m-auto">
        <Formik
          initialValues={UserModel}
          validationSchema={UserSchema}
          onSubmit={createUser}
        >
          <Form className="user-detail-form">
            {keys.map((title, i) => (
              <FormFields
                key={i}
                data={vals[i]}
                prefix={title}
              />
            ))}

            <div className="users-options">
              <button
                type="submit"
                className="clear-input glow-green"
              >
                <Icons.CreateUser />
                &nbsp;Create User
              </button>
            </div>
          </Form>
        </Formik>

        {message.text && (
          <Alert
            variant={message.variant}
            dismissible
            onClose={() => setMessage({})}
          >
            {message.text}
          </Alert>
        )}
      </div>
    </PageTab>
  );
}
