// src/pages/Recipe.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Recipe: React.FC = () => {
  return (
    <div className="recipe-page page-container">
      <h1>🍽️ とわの簡単レシピ (公開準備中)</h1>
      <p>
        愛犬とわのための安全でおいしい手作りレシピを公開予定です。お楽しみに！
      </p>

      {/* 💡 準備中エリア */}
      <section className="section-block preparation-notice">
        <h3>コンテンツ準備中です...</h3>
        <p>こだわりのレシピを現在まとめています。</p>
        <Link to="/" className="button primary large">
          🏠 ホームへ戻る
        </Link>
      </section>

    </div>
  );
};

export default Recipe;