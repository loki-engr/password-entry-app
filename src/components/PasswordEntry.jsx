// PasswordEntry.js

import React, { useState, useEffect } from 'react';
import './PasswordEntry.css'; // Import CSS file for styling

const PasswordEntry = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [validationResult, setValidationResult] = useState({ message: '', isError: false });

  useEffect(() => {
    validatePassword();
  }, [password1, password2]);

  const validatePassword = () => {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password1);
    const hasLowercase = /[a-z]/.test(password1);
    const hasNumber = /\d/.test(password1);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password1);

    if (!hasUppercase) {
      setValidationResult({ message: 'Password must have at least 1 uppercase character.', isError: true });
    } else if (!hasLowercase) {
      setValidationResult({ message: 'Password must have at least 1 lowercase character.', isError: true });
    } else if (!hasNumber) {
      setValidationResult({ message: 'Password must have at least 1 number.', isError: true });
    } else if (!hasSpecialChar) {
      setValidationResult({
        message: 'Password must have at least 1 special character (!@#$%^&*()_-+={[}]|:;"\'<,>.)',
        isError: true,
      });
    } else if (password1.length < minLength) {
      setValidationResult({ message: `Password must be at least ${minLength} characters.`, isError: true });
    } else {
      setValidationResult({ message: 'Password successfully validated.', isError: false });
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword1(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword2(newPassword);
  };

  const handleSubmit = () => {
    if (password1 !== password2 && password2 !== '') {
      setValidationResult({ message: 'Passwords do not match.', isError: true });
    } else {
      setValidationResult({ message: 'Submitted successfully!', isError: false });
    }
  };

  return (
    <div className="password-entry-container">
      <div className="password-input">
        <label>Password:</label>
        <input
          type="password"
          value={password1}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="password-input">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={password2}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <div className={`validation-result ${validationResult.isError ? 'error' : 'success'} ${!validationResult.message ? 'hidden' : ''}`}>
        {validationResult.message}
      </div>
    </div>
  );
};

export default PasswordEntry;
