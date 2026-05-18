import React, { useState, useEffect } from 'react';
import './Favorites.css';

function Favorites({ onBack }) {
  const [favIds, setFavIds] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));
  const allCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
  const favCards = allCards.filter(c => favIds.includes(c.id));

  const removeFavorite = (id) => {
    const updated = favIds.filter(fid => fid !== id);
    setFavIds(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="favorites">
      <div className="header">
        <button className="back-btn" onClick={onBack}>← Назад</button>
        <h2>⭐ Избранное</h2>
      </div>
      {favCards.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">⭐</span>
          <p>Нет избранных карточек</p>
        </div>
      ) : (
        <div className="card-grid">
          {favCards.map(card => (
            <div key={card.id} className="card-item" onClick={() => removeFavorite(card.id)}>
              <img src={card.dataUrl} className="card-thumb" alt={card.name} />
              <div className="card-info">
                <span className="card-name">{card.name}</span>
                <span className="card-date">{card.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;