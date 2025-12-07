// src/pages/Spots.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Spots: React.FC = () => {
  return (
    <div className="spots-page page-container">
      <h1>📍 おでかけスポット (公開準備中)</h1>
      <p>
        とわと一緒に行ったドッグランやカフェ、宿泊施設などを紹介します。
      </p>

      {/* 💡 準備中エリア */}
      <section className="section-block preparation-notice">
        <h3>コンテンツ準備中です...</h3>
        <p>とわ目線でおすすめのスポットを厳選してまとめています。</p>
        <Link to="/" className="button primary large">
          🏠 ホームへ戻る
        </Link>
      </section>

    </div>
  );
};

export default Spots;