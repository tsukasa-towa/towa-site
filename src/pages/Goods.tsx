// src/pages/Goods.tsx
import React from 'react';
// 💡 画像パスはプロジェクトに合わせて適宜調整してください
import nutroImage from '../assets/Goods/nutro_food.jpg';
import kongImage from '../assets/Goods/KONG.jpg';
import deerImage from '../assets/Goods/wishlist/deer.jpg'; // deer.jpgをインポート

// ------------------------------------------------------------------
// 💡 レーティングバーコンポーネント
// ------------------------------------------------------------------
interface RatingBarProps {
  label: string;
  value: number; // 0から5の値
}

const RatingBar: React.FC<RatingBarProps> = ({ label, value }) => {
  // バーの幅をパーセンテージで計算 (5段階評価なので value * 20%)
  const barWidth = `${value * 20}%`;

  // 評価に応じて色を変える（例：高評価はPrimaryカラー、低評価はSecondaryカラー）
  const barColor = value >= 4 ? '#ff9f6f' : value >= 3 ? '#ffe0b2' : '#bdbdbd';

  return (
    <div className="rating-bar-item">
      <span className="rating-label">{label}</span>
      <div className="rating-bar-container">
        {/* 実際に伸びるバー */}
        <div
          className="rating-bar-fill"
          style={{ width: barWidth, backgroundColor: barColor }}
        >
        </div>
        {/* テキスト値 (例: 4/5) */}
        <span className="rating-value">{value} / 5</span>
      </div>
    </div>
  );
};

const Goods = () => {
  interface GoodItemCardProps {
    category: string;
    name: string;
    image: string;
    review: {
      manufacturer: string;
      period: string;
      good: string;
      bad: string;
      advice: string;
      link: string;
    };
    rating: {
      overall: number;
      cost: number;
      effectiveness: number;
      towa_satisfaction: number;
    };
  }
  // 共通カードコンポーネントの定義（再利用性を高めるため）
  const GoodItemCard = ({ category, name, image, review, rating }: GoodItemCardProps) => (
    <div className="content-card good-item-card">
      {/* 💡 card-image-wrapperを追加し、画像サイズを制御 */}
      <div className="card-image-wrapper">
        <img className="card-image" src={image} alt={name} />
      </div>
      <div className="card-body">
        {/* categoryをクラス名として利用するためにスペースをハイフンに置換 */}
        <span className={`card-tag ${category.replace(/\s/g, '-')}`}>{category}</span>
        <h3>{name} - {review.manufacturer}</h3>

        <div className="rating-area">
          <p>⭐️ 総合評価: {rating.overall} / 5</p>
          {/* 💡 RatingBarコンポーネントを使用して視覚化 */}
          <RatingBar label="コスパ" value={rating.cost} />
          <RatingBar label="効果/機能性" value={rating.effectiveness} />
          <RatingBar label="とわの満足度" value={rating.towa_satisfaction} />
        </div>

        <p><strong>使用期間:</strong> {review.period}</p>

        <h4>リアルレビュー</h4>
        <p><strong>良い点:</strong> {review.good}</p>
        <p><strong>気になる点:</strong> {review.bad}</p>

        <div className="towa-photos">
          {/* [Photo/Video of Towa using the product] */}
        </div>

        <p><strong>アドバイス:</strong> {review.advice}</p>
        <p><a href={review.link} target="_blank" rel="noopener noreferrer">🛒 Amazon/楽天</a></p>
      </div>
    </div>
  );

  // 💡 実際に使用してレビュー済みの商品データ
  const sampleGoods = [
    {
      category: 'Food & Treats',
      name: 'Nutro ナチュラル チョイス 子犬用 (チキン&玄米)',
      image: nutroImage,
      review: {
        manufacturer: 'Nutro',
        period: '6ヶ月',
        good: '前に使っていたフードで涙やけがひどく、色々と試している中で出会った。食いつきが良く、ウンチの状態も良好。毛ヅヤもかなり良くなり、散歩していると褒められることが多い。',
        bad: '少し安いので6kg用を毎回買っているが、チャックがないので少し不便。毎回3kg用の袋に詰め替えて湿気を防いでいる。',
        advice: '少量のお湯でふやかして与えると消化しやすくなる。価格としては1500円/kgで他のフードと比べるとやや高め。',
        link: 'https://www.amazon.co.jp/dp/B007OP20KW?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1'
      },
      rating: {
        overall: 4,
        cost: 3,
        effectiveness: 4,
        towa_satisfaction: 5
      }
    },
    {
      category: "Toys",
      name: "KONG レッド（コング オリジナル）",
      image: kongImage,
      review: {
        manufacturer: "KONG",
        period: "1年半",
        good: "【天然ゴム製で安心】独自の天然ゴムを使用しており、安心して与えられます。また、身体のサイズや噛む力に合わせて、レッド（標準）のほか、より硬いブラック、子犬用のパープルなど硬さが選べる点も魅力的です。愛犬トワにはMサイズがちょうど良く、口にくわえやすいようです。\n【知育効果】内部の穴から簡単におやつが出ない特殊な構造で、愛犬が工夫して遊ぶ必要があります。このため、集中力と問題解決能力を養う知育玩具として最高です。",
        bad: "重いので室内で勢いよく投げると、床や家具に傷をつける危険性があります。最初はゴム独特の匂いがあるので、使用前にしっかり洗浄することをおすすめします。",
        advice: "【ペーストとの併用】コング純正のペースト状おやつ（スナック）を詰めて与えると食いつきが格段に上がります。\n【活用シーン】爪切りやドライヤーなど、愛犬が嫌がって集中できない作業中にコングを与えると、**作業から意識をそらす**ことができ、トレーニング効果が高まります。凍らせて与える活用法も強力です。",
        link: "https://amzn.asia/d/f8kOmpZ"
      },
      rating: {
        overall: 4,
        cost: 5,
        effectiveness: 4,
        towa_satisfaction: 5
      }
    },
  ];

  // 💡 今後使ってみたい商品のリストデータ
  const wishListItems = [
    { name: "モノライフ 鹿の角", image: deerImage, description: "化学物質不使用で、長時間噛み続けられる高耐久トイ。興奮時のクールダウンにも期待。", link: "https://amzn.asia/d/0atbBqf" }, // 必須
  ];

  // 💡 エラー対策＆コードの整理: ウィッシュリスト用のカードコンポーネント (レビューカードのスタイルを適用)
  // wishListItemsのデータ構造に合わせてpropsを定義
  interface WishlistItemCardProps {
    name: string;
    image: string;
    description: string;
    link: string;
  }

  const WishlistItemCard = ({ name, image, description, link }: WishlistItemCardProps) => (
    // レビューカードと同じクラスを適用することでスタイルを統一
    <div className="content-card good-item-card">
      <div className="card-image-wrapper">
        <img className="card-image" src={image} alt={name} />
      </div>
      {/* card-bodyでラップすることで、Flexboxによる高さ揃えとボタン配置が機能する */}
      <div className="card-body">
        <h4>{name}</h4>
        <p>{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="button small secondary"
        >
          Amazonで詳細を見る
        </a>
      </div>
    </div>
  );


  return (
    <div className="goods-page page-container">
      <h1>🎁 Goods - とわの愛用品レビュー</h1>
      <p>食いつき、耐久性、デザインで選んだ、自信をもっておすすめできるアイテムを紹介します。</p>

      {/* カテゴリ別のナビゲーション */}
      <nav className="goods-category-nav">
        {/* Food & Treats, Toys, Care Items, Fashion へのアンカーリンク */}
      </nav>

      {/* 商品一覧 */}
      <div className="content-grid">
        {sampleGoods.map((item, index) => (
          <GoodItemCard key={`good-${index}`} {...item} />
        ))}
      </div>

      {/* 💡 修正: 今後使ってみたい商品のリストエリア (ウィッシュリスト) */}
      <section className="wishlist-goods section-block">
        <h2>🛒 とわのウィッシュリスト (次に試したい商品)</h2>
        <p>次に購入を検討している、話題のアイテムや気になる商品リストです。使ったらレビューを更新予定！</p>

        {/* 💡 コンテナをレビューカードと同じ「content-grid」に変更し、間隔を統一 */}
        <div className="content-grid">
          {/* 💡 新しく定義したコンポーネントを使用して、コードをクリーン化 */}
          {wishListItems.map((item, index) => (
            <WishlistItemCard key={`wish-${index}`} {...item} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Goods;