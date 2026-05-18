import React, { useState } from 'react';
import './Profile.css';

function Profile({ onBack }) {
  const saved = JSON.parse(localStorage.getItem('user_profile') || '{}');
  const [name, setName] = useState(saved.name || '');
  const [email, setEmail] = useState(saved.email || '');
  const [apikey, setApikey] = useState(saved.apikey || '');

  const handleSave = () => {
    if (!name.trim() || !email.trim()) { alert('Введите имя и email'); return; }
    const profile = { name: name.trim(), email: email.trim(), apikey: apikey.trim() };
    localStorage.setItem('user_profile', JSON.stringify(profile));
    alert('Профиль сохранён!');
    onBack();
  };

  const handleLogout = () => {
    if (confirm('Выйти из профиля?')) {
      localStorage.removeItem('user_profile');
      onBack();
    }
  };

  return (
    <div className="profile">
      <div className="header">
        <button className="back-btn" onClick={onBack}>← На главную</button>
        <h2>⚙️ Профиль</h2>
      </div>
      <div className="profile-form">
        <label>Имя</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Давид" />
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="david@example.com" />
        <label>OpenRouter API Key</label>
        <input type="password" value={apikey} onChange={e => setApikey(e.target.value)} placeholder="sk-or-v1-..." />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-primary" onClick={handleSave}>💾 Сохранить</button>
          {saved.name && <button className="btn-primary" style={{ background: '#ef4444' }} onClick={handleLogout}>🚪 Выйти</button>}
        </div>
      </div>
    </div>
  );
}

export default Profile;