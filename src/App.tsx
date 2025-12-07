// App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// 💡 修正: インポートと同時に型をコメントアウトすることで、TSが値の利用チェックをスキップすることがあります
import type { SpeedInsights } from "@vercel/speed-insights/react";
import { SpeedInsights as SpeedInsightsComponent } from "@vercel/speed-insights/react";
import './App.css';

// 各ページコンポーネントをインポート
import Home from './pages/Home.tsx';
import Profile from './pages/Profile.tsx';
import Goods from './pages/Goods.tsx';
import Spots from './pages/Spots.tsx';
import Recipe from './pages/Recipe.tsx';
import Journey from './pages/Journey.tsx'; // 💡 追加: Journeyページをインポート

// 仮のナビゲーションバーコンポーネント
const Navigation = () => (
  <nav className="main-nav">
    <Link to="/">🏠 HOME</Link>
    <Link to="/profile">👤 Profile</Link>
    <Link to="/journey">🌍 World Tour</Link> {/* 💡 追加: World Tourのリンク */}
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
      <SpeedInsightsComponent /> {/* 💡 修正: SpeedInsightsコンポーネントをRouter直下に配置 */}
      <Navigation />
      <div id="root-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/journey" element={<Journey />} /> {/* 💡 追加: Journeyルート */}
          <Route path="/goods" element={<Goods />} />
          <Route path="/spots" element={<Spots />} />
          <Route path="/recipe" element={<Recipe />} />
          {/* Footerで参照されているプライバシーポリシーとサイトマップのルートも追加 */}
          <Route path="/privacy" element={<div>プライバシーポリシーページ</div>} />
          <Route path="/sitemap" element={<div>サイトマップページ</div>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;