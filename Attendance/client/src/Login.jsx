import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('choice');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const u = username.trim();
    const p = password;
    if (u === 'admin' && p === 'Krish110601@') {
      onLogin(true);
      return;
    }
    setError('Invalid credentials');
  }

  return (
    <div className="login-page centered-page">
      <div className="login-form-wrap visible">
        <div className="card login-card">
          {mode === 'choice' ? (
            <>
              <h2>Choose Access</h2>
              <p>Select how you want to enter the app.</p>
              <div className="button-grid">
                <button type="button" onClick={() => onLogin(false)}>Enter as User</button>
                <button type="button" onClick={() => setMode('admin')}>Enter as Admin</button>
              </div>
            </>
          ) : (
            <>
              <h2>Admin Login</h2>
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                {error && <div className="error">{error}</div>}
                <button type="submit">Sign In</button>
                <button type="button" className="secondary-button" onClick={() => setMode('choice')}>Back</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
