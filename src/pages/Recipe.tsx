// src/pages/Recipe.tsx
import React from 'react';

const Recipe = () => {
  interface RecipeCardProps {
    name: string;
    difficulty: string;
    time: string;
    target: string;
    efficacy: string;
  }

  const RecipeCard = ({ name, difficulty, time, target, efficacy }: RecipeCardProps) => (
    <div className="content-card recipe-card">
      <img className="card-image" src={`/recipes/${name}.jpg`} alt={name} />
      <div className="card-body">
        <h2>{name}</h2>
        <div className="recipe-meta">
          <span className="meta-tag difficulty">難易度: {difficulty}</span>
          <span className="meta-tag time">調理時間: {time}</span>
          <span className="meta-tag target">対象: {target}</span>
        </div>
        
        <p><strong>栄養ポイント・効能:</strong> {efficacy}</p>
        
        <div className="ingredients-list">
          <h4>材料リスト（分量）</h4>
          <ul>
            <li>鶏むね肉: 100g</li>
            <li>キャベツ: 50g</li>
            <li>ご飯: 50g</li>
            {/* ... その他材料 ... */}
          </ul>
        </div>
        
        <div className="instructions">
          <h4>作り方（ステップ）</h4>
          {/* [Step-by-step photos placeholder] */}
          <ol>
            <li>材料を細かく切ります。</li>
            <li>すべての材料を鍋に入れ、煮込みます。</li>
            {/* ... ステップを追記 ... */}
          </ol>
        </div>

        <div className="veterinarian-note">
          {/* [獣医師監修マーク（可能なら）] */}
          <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ 注意事項: 必ず与えてはいけない食材（ネギ類、チョコレートなど）を確認してください。</p>
        </div>
        
        <a href="#">詳細を見る（実食動画・写真）</a>
      </div>
    </div>
  );

  const sampleRecipes = [
    { name: '鶏むね肉と野菜の簡単ポトフ', difficulty: '★☆☆', time: '20分', target: '成犬/シニア', efficacy: '低カロリーで消化に良い、ダイエット中の子にも。' },
    { name: '誕生日用ミートケーキ', difficulty: '★★★', time: '60分', target: '成犬/子犬', efficacy: '特別な日のお祝いに。タンパク質が豊富。' },
  ];

  return (
    <div className="recipe-page page-container">
      <h1>🍽️ Recipe - とわのわんご飯レシピ</h1>
      <p>とわの健康と食いつきを考えた、簡単で美味しい手作り犬ご飯を紹介します。</p>

      {/* レシピカテゴリのナビゲーション */}
      <nav className="recipe-category-nav">
        {/* Daily Menu, Special Occasion, Healthy Options, Cooking Tips へのアンカーリンク */}
      </nav>
      
      <div className="content-grid">
        {sampleRecipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </div>
      
      <section className="cooking-tips section-block">
        <h2>Cooking Tips</h2>
        <p>食材の下処理の方法や、手作りご飯の冷凍保存のコツを紹介しています。</p>
        {/* ... */}
      </section>
    </div>
  );
};

export default Recipe;