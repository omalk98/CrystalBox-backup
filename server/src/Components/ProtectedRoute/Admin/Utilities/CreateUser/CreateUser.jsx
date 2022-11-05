import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Requests from '../../../../../Requests';
import Icons from '../../../../../Resources/Icons';
import {
  PageTab,
  getInputType,
  capitalizeFirst,
  ProvinceListOptions
} from '../../../../Common';
import UserModel, { UserSchema } from './UserModel';

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
            className={`${
              type === 'number' ? 'clear-input number-input' : 'detail-input'
            } glow-yellow`}
            name={prefix}
            type={type}
            min={type === 'number' ? 0 : null}
            max={type === 'number' ? 3 : null}
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
  const keys = Object.keys(UserModel);
  const vals = Object.values(UserModel);

  const privateRequest = Requests.Private.Hook();

  const createUser = async (values, actions) => {
    console.log(values);
    try {
      const res = await privateRequest(
        Requests.Private.Post.createUser(values)
      );
      if (res.status !== 200) {
        return;
      }
    } catch {
      console.log('hello');
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

            <button
              type="submit"
              className="clear-input glow-green"
            >
              Temp Submit
            </button>
          </Form>
        </Formik>
      </div>
    </PageTab>
  );
}
