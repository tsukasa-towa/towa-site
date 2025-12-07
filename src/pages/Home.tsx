// pages/Home.tsx (新規作成)

import { Link } from 'react-router-dom';

// 💡 ヒーロー画像をインポート
import heroImage from '../assets/towa_hero.jpg';

const Home = () => {
  return (
    <div className="home-page">
      {/* ヒーローセクション */}
      <section className="hero-section">
        {/* 💡 修正: hero-content でテキストとボタンを囲み、画像と並列にする */}
        <div className="hero-content">
          <h1>わんダフルな毎日を！<br />シェルティとわの成長記録</h1> {/* <br/>を追加してレイアウト調整 */}
          <p className="subtitle">一緒にシェルティライフを楽しもう！</p> {/* 💡 subtitleクラスを追加 */}
          <div className="social-buttons">
            <a href="https://instagram.com/towa_life2025" target="_blank" className="button primary">📷 Instagramをフォロー</a> {/* 💡 primaryクラスを追加 */}
            <a href="https://tiktok.com/@towa_life2025" target="_blank" className="button secondary">🎶 TikTokをフォロー</a> {/* 💡 secondaryクラスを追加 */}
          </div>
        </div>
        {/* 💡 画像にalt属性を追加 */}
        <img src={heroImage} alt="可愛らしいシェットランドシープドッグのとわ" className="hero-image" />
      </section>

      {/* Aboutセクション */}
      <section className="about-section section-block"> {/* 💡 section-blockを追加 */}
        <h2>🐶 About とわ</h2>
        <p>とわは、2025年2月3日生まれのシェットランドシープドッグです。やんちゃで食いしん坊ですが甘えん坊な一面もあり、そばにいないと細い声でくぅんと鳴いています。このサイトでは、愛用品のレビューやお出かけ情報、手作りレシピなどをのんびり発信しています！</p>
        <Link to="/profile" className="button tertiary">もっと詳しく見る → Profileページへ</Link>
      </section>



      {/* Latest Articlesセクション */}
      <section className="latest-articles section-block">
        <h2>✨ 最新の記事</h2>
        <div className="content-grid">
          {/* Goods記事 例 */}
          <div className="content-card">
            <img className="card-image" src="goods_image.jpg" alt="Goods Item" />
            <div className="card-body">
              <span className="card-tag">🎁 Goods</span>
              <h3>【レビュー】長持ちおもちゃ！KONG耐久テスト</h3>
              <p className="card-date">投稿日: 2025.11.25</p>
              <Link to="/goods" className="card-link-button">記事を読む</Link>
            </div>
          </div>
          {/* Spots記事 例 */}
          <div className="content-card">
            <img className="card-image" src="spots_image.jpg" alt="Dog Run" />
            <div className="card-body">
              <span className="card-tag">📍 Spots</span>
              <h3>【関東】芝生が気持ちいい！大型犬OKドッグラン</h3>
              <p className="card-date">投稿日: 2025.11.20</p>
              <Link to="/spots" className="card-link-button">記事を読む</Link>
            </div>
          </div>
          {/* ... 合計6記事のプレースホルダー ... */}
        </div>
        <Link to="/goods" className="button tertiary view-all">全て見る</Link>
      </section>

      {/* Instagram埋め込みエリア */}
      <section className="instagram-feed">
        <h2>最新Instagram投稿</h2>

        {/* 💡 ここにHTML部分を埋め込みます */}
        <div className="embedsocial-hashtag" data-ref="d897f3b0ed4b98624474e5b2f1276955047b59a1">
          <a
            className="feed-powered-by-es feed-powered-by-es-feed-img es-widget-branding"
            href="https://embedsocial.jp/"
            target="_blank"
            title="EmbedSocialで作成しました"
            rel="noopener noreferrer" // セキュリティ対策として追加
          >
            <img
              src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp"
              alt="EmbedSocial"
            />
            <div className="es-widget-branding-text">EmbedSocialで作成しました</div>
          </a>
        </div>

        <a href="https://instagram.com/towa_life2025" target="_blank" className="button secondary">Instagramで見る</a>
      </section>
    </div>
  );
};

export default Home;