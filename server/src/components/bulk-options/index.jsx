import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

import Requests from '../../requests';
import Icons from '../../resources/icons';

export default function BulkOptions({
  selectedUsers,
  setSelectedUsers,
  removeUsers
}) {
  const [message, setMessage] = useState({});
  const privateRequest = Requests.Private.Hook();

  const deactivateUsers = async () => {
    try {
      setMessage({});
      if (!selectedUsers?.length) {
        setMessage({ text: 'No users selected', variant: 'danger' });
        return;
      }
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (confirm('Are you sure you want to Deactivate these users?')) {
        const res = await privateRequest(
          Requests.Private.Put.bulkDeactivateUsers(selectedUsers)
        );
        if (res.status !== 200) throw new Error('Session expired');
        setMessage({
          text: 'Deactivated selected users successfully',
          variant: 'success'
        });
      }
    } catch {
      setMessage({
        text: 'Failed to Deactivate selected users',
        variant: 'danger'
      });
    }
  };

  const lockUsers = async () => {
    try {
      setMessage({});
      if (!selectedUsers?.length) {
        setMessage({ text: 'No users selected', variant: 'danger' });
        return;
      }
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (confirm('Are you sure you want to Lock these users?')) {
        const res = await privateRequest(
          Requests.Private.Put.bulkLockUsers(selectedUsers)
        );
        if (res.status !== 200) throw new Error('Session expired');
        setMessage({
          text: 'Locked selected users successfully',
          variant: 'success'
        });
      }
    } catch {
      setMessage({ text: 'Failed to Lock selected users', variant: 'danger' });
    }
  };

  const deleteUsers = async () => {
    try {
      setMessage({});
      if (!selectedUsers?.length) {
        setMessage({ text: 'No users selected', variant: 'danger' });
        return;
      }
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (confirm('Are you sure you want to Delete these users?')) {
        const res = await privateRequest(
          Requests.Private.Delete.bulkDeleteUsers(selectedUsers)
        );
        if (res.status !== 200) throw new Error('Session expired');
        removeUsers(selectedUsers);
        // eslint-disable-next-line no-param-reassign
        setSelectedUsers([]);
        setMessage({
          text: 'Deleted selected users successfully',
          variant: 'success'
        });
      }
    } catch {
      setMessage({
        text: 'Failed to Delete selected users',
        variant: 'danger'
      });
    }
  };
  return (
    <>
      <div className="users-options">
        <button
          type="button"
          className="clear-input hover-black glow-purple"
          onClick={deactivateUsers}
        >
          <Icons.KeyOff />
          &nbsp;Deactivate Selected Users
        </button>

        <button
          type="button"
          className="clear-input hover-black glow-yellow"
          onClick={lockUsers}
        >
          <Icons.Lock />
          &nbsp;Lock Selected Users
        </button>

        <button
          type="button"
          className="clear-input hover-black glow-red"
          onClick={deleteUsers}
        >
          <Icons.Trash />
          &nbsp;Delete Selected Users
        </button>
      </div>
      {Object.values(message).length !== 0 && (
        <Alert
          className="mb-5"
          variant={message?.variant}
          dismissible
          onClose={() => setMessage({})}
        >
          {message?.text}
        </Alert>
      )}
      {selectedUsers?.length ? (
        <div className="selected-users">
          <h5>
            <u>Selected Users</u>
          </h5>
          <ul>
            {selectedUsers?.map((user, i) => (
              <li key={i}>{user}</li>
            ))}
          </ul>
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      <hr />
    </>
  );
}
