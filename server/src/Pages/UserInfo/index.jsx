import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import Requests from '../../Requests';
import { PageTab } from '../../Components/Common';
import Icons from '../../Resources/Icons';
import UserProfile from '../../Components/UserProfile';

function UserInfoButtons({ user, setUser, id }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState({});
  const privateRequest = Requests.Private.Hook();

  const toggleActivateUser = async () => {
    const stat = user?.server_details?.details?.status?.activated;
    try {
      setMessage({});
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (confirm('Are you sure you want to Activate this user?')) {
        const res = await privateRequest(
          Requests.Private.Put.toggleActivateUser(id)
        );
        if (res.status !== 200) throw new Error('Session expired');
        const activated = document.querySelector('[id="status.activated"]');
        activated.innerHTML = stat ? 'No' : 'Yes';
        setUser((prev) => ({
          ...prev,
          server_details: {
            ...prev.server_details,
            details: {
              ...prev.server_details.details,
              status: {
                ...prev.server_details.details.status,
                activated: !user?.server_details?.details?.status?.activated
              }
            }
          }
        }));
        setMessage({
          text: `User ${stat ? 'Deactivated' : 'Activated'} successfully`,
          variant: 'success'
        });
      }
    } catch {
      setMessage({
        text: `Failed to ${stat ? 'Deactivated' : 'Activated'} user`,
        variant: 'danger'
      });
    }
  };

  const toggleLockUser = async () => {
    const stat = user?.server_details?.details?.status?.locked;
    try {
      setMessage({});
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (confirm('Are you sure you want to Lock this user?')) {
        const res = await privateRequest(
          Requests.Private.Put.toggleLockUser(id)
        );
        if (res.status !== 200) throw new Error('Session expired');
        const locked = document.querySelector('[id="status.locked"]');
        locked.innerHTML = stat ? 'No' : 'Yes';
        setUser((prev) => ({
          ...prev,
          server_details: {
            ...prev.server_details,
            details: {
              ...prev.server_details.details,
              status: {
                ...prev.server_details.details.status,
                locked: !user?.server_details?.details?.status?.locked
              }
            }
          }
        }));
        setMessage({
          text: `User ${stat ? 'Unlocked' : 'Locked'} successfully`,
          variant: 'success'
        });
      }
    } catch {
      setMessage({
        text: `Failed to ${stat ? 'Unlocked' : 'Locked'} user`,
        variant: 'danger'
      });
    }
  };

  const deleteUser = async () => {
    try {
      setMessage({});
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (confirm('Are you sure you want to Delete this user?')) {
        const res = await privateRequest(
          Requests.Private.Delete.deleteUser(id)
        );
        if (res.status !== 200) throw new Error('Session expired');
        setMessage({ text: 'User Deleted successfully', variant: 'success' });
      }
    } catch {
      setMessage({ text: 'Failed to Delete user', variant: 'danger' });
    }
  };

  return (
    <>
      <div className="users-options">
        <button
          type="button"
          className="clear-input hover-black glow-green"
          onClick={() => navigate('/console/admin/users')}
        >
          <Icons.Back />
          &nbsp;Back
        </button>

        <button
          type="button"
          className="clear-input hover-black glow-purple"
          onClick={toggleActivateUser}
        >
          {user?.server_details?.details?.status?.activated ? (
            <>
              <Icons.KeyOff />
              &nbsp;Deactivate
            </>
          ) : (
            <>
              <Icons.Key />
              &nbsp;Activate
            </>
          )}
        </button>

        <button
          type="button"
          className="clear-input hover-black glow-yellow"
          onClick={toggleLockUser}
        >
          {user?.server_details?.details?.status?.locked ? (
            <>
              <Icons.Unlock />
              &nbsp;Unlock
            </>
          ) : (
            <>
              <Icons.Lock />
              &nbsp;Lock
            </>
          )}
        </button>

        <button
          type="button"
          className="clear-input hover-black glow-red"
          onClick={deleteUser}
        >
          <Icons.Trash />
          &nbsp;Delete
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
      <hr />
    </>
  );
}

export default function UserInfo() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const privateRequest = Requests.Private.Hook();

  useEffect(() => {
    const controller = new AbortController();
    const getUser = async () => {
      try {
        if (user.length) return;
        const res = await privateRequest(
          Requests.Private.Get.userById(id, controller.signal)
        );
        if (res.status !== 200) throw new Error('Session expired');
        setUser(res.data);
      } catch {
        setUser({});
      }
    };

    getUser();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PageTab
      type="admin"
      title="User Profile"
      icon={<Icons.Profile />}
    >
      <UserInfoButtons
        user={user}
        setUser={setUser}
        id={id}
      />
      <UserProfile
        userData={user}
        isOtherUser
      />
    </PageTab>
  );
}
