import React from 'react';
import './Dashboard.css';

function Dashboard({ onNavigate, user }) {
  const userName = user?.first_name || 'Давид';
  const savedCount = JSON.parse(localStorage.getItem('savedCards') || '[]').length;
  const favCount = JSON.parse(localStorage.getItem('favorites') || '[]').length;

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="greeting">
          <h1>Здравствуйте, Уважаемый {userName} 👋</h1>
          <p className="subtitle">Создавай продающие карточки с AI</p>
        </div>
        <div className="avatar" onClick={() => onNavigate('profile')}>{userName.charAt(0)}</div>
      </header>
      <div className="quick-actions">
        <button className="action-card primary" onClick={() => onNavigate('creator')}>
          <span className="icon">✨</span><span className="label">Создать карточку</span><span className="arrow">→</span>
        </button>
        <div className="action-row">
          <button className="action-card" onClick={() => onNavigate('gallery')}>
            <span className="icon">📁</span><span className="label">Мои карточки</span>
          </button>
          <button className="action-card" onClick={() => onNavigate('favorites')}>
            <span className="icon">⭐</span><span className="label">Избранное</span>
          </button>
        </div>
        <div className="action-row">
          <button className="action-card" onClick={() => onNavigate('styles')}>
            <span className="icon">🎨</span><span className="label">Библиотека стилей</span>
          </button>
          <button className="action-card" onClick={() => onNavigate('profile')}>
            <span className="icon">⚙️</span><span className="label">Настройки</span>
          </button>
        </div>
      </div>
      <div className="stats-block">
        <h3>📊 Статистика</h3>
        <div className="stat-row">
          <div className="stat-item"><span className="stat-value">{savedCount}</span><span className="stat-label">Сохранено</span></div>
          <div className="stat-item"><span className="stat-value">{favCount}</span><span className="stat-label">В избранном</span></div>
          <div className="stat-item"><span className="stat-value">0</span><span className="stat-label">Сгенерировано</span></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;