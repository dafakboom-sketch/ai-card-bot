import React from 'react';
import { useTelegram } from './hooks/useTelegram';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CardCreator from './components/CardCreator';
import Gallery from './components/Gallery';
import Favorites from './components/Favorites';
import StylesLibrary from './components/StylesLibrary';
import './App.css';

function App() {
  const { tg, theme, user } = useTelegram();
  const [screen, setScreen] = React.useState('dashboard');

  React.useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      if (screen !== 'dashboard') {
        tg.BackButton.show();
        tg.BackButton.onClick(() => setScreen('dashboard'));
      } else {
        tg.BackButton.hide();
      }
    }
  }, [tg, screen]);

  React.useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  return (
    <div className="app-shell">
      {screen === 'dashboard' && <Dashboard onNavigate={setScreen} user={user} />}
      {screen === 'profile' && <Profile onBack={() => setScreen('dashboard')} />}
      {screen === 'creator' && <CardCreator onBack={() => setScreen('dashboard')} />}
      {screen === 'gallery' && <Gallery onBack={() => setScreen('dashboard')} />}
      {screen === 'favorites' && <Favorites onBack={() => setScreen('dashboard')} />}
      {screen === 'styles' && <StylesLibrary onBack={() => setScreen('dashboard')} />}
    </div>
  );
}

export default App;