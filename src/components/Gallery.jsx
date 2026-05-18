import React, { useState, useEffect } from 'react';
import './Gallery.css';

function Gallery({ onBack }) {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem('savedCards') || '[]'));
  }, []);

  const deleteCard = (id) => {
    const updated = cards.filter(c => c.id !== id);
    setCards(updated);
    localStorage.setItem('savedCards', JSON.stringify(updated));
    setSelected(null);
  };

  if (selected) {
    return (
      <div className="gallery-detail">
        <div className="header">
          <button className="back-btn" onClick={() => setSelected(null)}>← Назад</button>
          <h2>{selected.name}</h2>
        </div>
        <img src={selected.dataUrl} className="detail-image" alt={selected.name} />
        <div className="detail-actions">
          <button className="btn-outline" onClick={() => {
            const newName = prompt('Новое название:', selected.name);
            if (newName?.trim()) {
              const updated = cards.map(c => c.id === selected.id ? { ...c, name: newName.trim() } : c);
              setCards(updated);
              localStorage.setItem('savedCards', JSON.stringify(updated));
              setSelected(prev => ({ ...prev, name: newName.trim() }));
            }
          }}>✏️ Переименовать</button>
          <button className="btn-outline" onClick={() => {
            const a = document.createElement('a');
            a.href = selected.dataUrl;
            a.download = `${selected.name}.png`;
            a.click();
          }}>⬇️ Скачать</button>
          <button className="btn-danger" onClick={() => { if (confirm('Удалить?')) deleteCard(selected.id); }}>🗑️ Удалить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="header">
        <button className="back-btn" onClick={onBack}>← Назад</button>
        <h2>📁 Сохранённые карточки</h2>
      </div>
      {cards.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">📂</span>
          <p>Нет сохранённых карточек</p>
          <button className="btn-primary" onClick={onBack}>Создать первую</button>
        </div>
      ) : (
        <div className="card-grid">
          {cards.map(card => (
            <div key={card.id} className="card-item" onClick={() => setSelected(card)}>
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

export default Gallery;