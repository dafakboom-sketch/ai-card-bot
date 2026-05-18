import React from 'react';
import './StylesLibrary.css';

function StylesLibrary({ onBack }) {
  return (
    <div className="style-library">
      <div className="header">
        <button className="back-btn" onClick={onBack}>← Назад</button>
        <h2>🎨 Библиотека стилей</h2>
      </div>
      <div className="empty">
        <span className="empty-icon">🎨</span>
        <p>Стили появятся позже (Спринт 2)</p>
      </div>
    </div>
  );
}

export default StylesLibrary;