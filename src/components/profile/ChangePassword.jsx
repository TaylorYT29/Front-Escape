import React, { useState, useEffect } from "react";
import { InputProfile } from "../inputs/InputProfile";
import { useUser } from "../../context/UserContext.jsx";
import { useTranslation } from "react-i18next";

export function ChangePassword({ close }) {
  const { user } = useUser();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      console.log('User data:', user); 
    }
  }, [user]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const body = {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: checkPassword,
        id: user.id
      }

      const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Password changed successfully');
        setSuccess('Password changed successfully');
        setError(null);
        //close();
      } else {
        console.error('Failed to change password:', data.message);
        setError(data.message || 'Failed to change password');
        setSuccess(null);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again later.');
      setSuccess(null);
    }
  };

  return (
    <div className="grid justify-center md:m-4">
      <form onSubmit={handleChangePassword}>
        <div className="grid gap-6 mb-6">
          <h2 className="font-bold text-sky-500 text-3xl text-center mb-4">
            {t('change')}
          </h2>
          <InputProfile
            placeholder={t('oldPassword')}
            type="password"
            id="old-password"
            label={t('oldPassword')}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <InputProfile
            placeholder={t('newPassword')}
            type="password"
            id="new-password"
            label={t('newPassword')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <InputProfile
            placeholder={t('confirmPassword')}
            type="password"
            id="check-password"
            label={t('confirmPassword')}
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="grid gap-6 lg:grid-cols-2 grid-cols-1 w-full pb-2 pt-2">
          <button
            type="button"
            className="hover:text-white border-2 border-sky-500 hover:bg-sky-500 p-2 rounded-lg"
            onClick={close}
          >
            {t('Cancel')}
          </button>
          <button
            type="submit"
            className="text-white bg-sky-500 border-sky-500 hover:bg-sky-600 hover:border-sky-600 border-2 p-2 rounded-lg"
          >
            {t('changebtn')}
          </button>
        </div>
      </form>
    </div>
  );
}
