// App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react"
import './App.css'; // App.cssは残し、全体のスタイルに利用

// 各ページコンポーネントをインポート
import Home from './pages/Home.tsx';
import Profile from './pages/Profile.tsx';
import Goods from './pages/Goods.tsx';
import Spots from './pages/Spots.tsx';
import Recipe from './pages/Recipe.tsx';

// 仮のナビゲーションバーコンポーネント
const Navigation = () => (
  <nav className="main-nav">
    <Link to="/">🏠 HOME</Link>
    <Link to="/profile">👤 Profile</Link>
    <Link to="/goods">🎁 Goods</Link>
    <Link to="/spots">📍 Spots</Link>
    <Link to="/recipe">🍽️ Recipe</Link>
    <div className="sns-links">
      <a href="https://instagram.com/towa_life2025" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://tiktok.com/@towa_life2025" target="_blank" rel="noopener noreferrer">TikTok</a>
    </div>
  </nav>
);

const Footer = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} Towa's Sheltie Life. All rights reserved.</p>
    <p>
      <Link to="/privacy">プライバシーポリシー</Link> | <Link to="/sitemap">サイトマップ</Link>
    </p>
  </footer>
);

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div id="root-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/goods" element={<Goods />} />
          <Route path="/spots" element={<Spots />} />
          <Route path="/recipe" element={<Recipe />} />
        </Routes>
      </div>
      <Footer />
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;