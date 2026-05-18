import React, { useState, useRef } from 'react';
import { generateImages } from '../utils/openrouter';
import './CardCreator.css';

const TEMPLATES = [
  { id: 'portfolio', name: '🎨 Портфолио (Kwork)', desc: 'Для бирж' },
  { id: 'marketplace', name: '🛍️ Маркетплейсы', desc: 'WB, Ozon, Яндекс.Маркет' },
];
const MARKETPLACES = [
  { id: 'wildberries', name: '🟣 Wildberries' },
  { id: 'ozon', name: '🔵 Ozon' },
  { id: 'yandex', name: '🟡 Яндекс.Маркет' },
];

function CardCreator({ onBack }) {
  const [step, setStep] = useState(1);
  const [template, setTemplate] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) { alert('Загрузите изображение'); return; }
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    const apikey = JSON.parse(localStorage.getItem('user_profile') || '{}').apikey;
    if (!apikey) { alert('Введите API-ключ в Профиле'); return; }
    if (!image) { alert('Загрузите фото товара'); return; }
    setProcessing(true);
    setError(null);
    try {
      const prompt = `Создай ${quantity} ${template === 'marketplace' ? 'карточек товара для ' + marketplace : 'изображений для портфолио'}. Стиль: продающий, минимализм, высокий CTR. Фон подбери сам, текст придумай сам, тени добавь реалистичные, качество 8K.`;
      const images = await generateImages(apikey, prompt);
      const newCards = images.map((dataUrl, i) => ({
        id: Date.now() + i,
        name: `Карточка ${template === 'marketplace' ? marketplace : 'портфолио'} ${i + 1}`,
        dataUrl,
        createdAt: new Date().toLocaleDateString('ru-RU'),
      }));
      const stored = JSON.parse(localStorage.getItem('savedCards') || '[]');
      localStorage.setItem('savedCards', JSON.stringify([...stored, ...newCards]));
      alert(`Сгенерировано ${newCards.length} карточек!`);
      onBack();
    } catch (err) {
      setError(err.message);
    }
    setProcessing(false);
  };

  return (
    <div className="card-creator">
      <div className="creator-header">
        <button className="back-btn" onClick={onBack}>← Назад</button>
        <h2>Создание карточки</h2>
        <span className="step-indicator">Шаг {step}/4</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>

      {step === 1 && (
        <div className="step-content">
          <h3>Выберите шаблон</h3>
          <div className="options-grid">
            {TEMPLATES.map(t => (
              <button key={t.id} className={`option-card ${template === t.id ? 'selected' : ''}`} onClick={() => setTemplate(t.id)}>
                <span className="option-name">{t.name}</span>
                <span className="option-desc">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && template === 'marketplace' && (
        <div className="step-content">
          <h3>Выберите маркетплейс</h3>
          <div className="options-grid">
            {MARKETPLACES.map(m => (
              <button key={m.id} className={`option-card ${marketplace === m.id ? 'selected' : ''}`} onClick={() => setMarketplace(m.id)}>
                <span className="option-name">{m.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && template === 'portfolio' && (
        <div className="step-content">
          <h3>Маркетплейс не требуется</h3>
          <p>Для портфолио выбор площадки пропускается. Нажмите «Далее».</p>
        </div>
      )}

      {step === 3 && (
        <div className="step-content">
          <h3>Сколько вариантов?</h3>
          <div className="quantity-grid">
            {[1,2,3,4,5].map(q => (
              <button key={q} className={`quantity-btn ${quantity === q ? 'selected' : ''}`} onClick={() => setQuantity(q)}>{q}</button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="step-content">
          <h3>Загрузите фото товара</h3>
          <div className={`upload-area ${image ? 'has-image' : ''}`} onClick={() => fileInputRef.current.click()}>
            <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]); }} />
            {image ? <img src={image} className="preview-image" alt="preview" /> : <div className="upload-placeholder"><span className="upload-icon">📷</span><p>Нажмите, чтобы выбрать фото</p></div>}
          </div>
        </div>
      )}

      {processing && (
        <div className="processing-overlay">
          <div className="processing-content">
            <h3>⏳ Идёт генерация...</h3>
            {error && <p className="error-msg">❌ {error}</p>}
          </div>
        </div>
      )}

      <div className="step-actions">
        {step > 1 && <button className="btn-outline" onClick={() => setStep(step - 1)}>Назад</button>}
        {step < 4 && (
          <button className="btn-primary" onClick={() => {
            if (step === 1 && template === 'portfolio') setStep(3);
            else setStep(step + 1);
          }} disabled={!template}>Далее</button>
        )}
        {step === 4 && (
          <button className="btn-primary" onClick={handleGenerate} disabled={!image || processing}>
            🚀 Сгенерировать
          </button>
        )}
      </div>
      <button className="btn-exit" onClick={onBack}>↩️ Выйти в главное меню</button>
    </div>
  );
}

export default CardCreator;