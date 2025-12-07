// src/pages/Spots.tsx


const Spots = () => {
  interface SpotCardProps {
    name: string;
    address: string;
    rating: number; // 5段階評価なので数値型
    conditions: {
      leash: string; // ノーリード可/リード必須
      dogSize: string; // 小型犬のみ/全犬種OK
      area: string; // 屋内/屋外
      vaccine: boolean; // 予防接種証明必要か
      crowdedness: string; // 混雑度
      goodPoints: string;
      badPoints: string;
    };
  }

  const SpotCard = ({ name, address, rating, conditions }: SpotCardProps) => (
    <div className="content-card spot-card">
      <img className="card-image" src={`/spots/${name}.jpg`} alt={name} />
      <div className="card-body">
        <h2>{name}</h2>
        <p>📍 {address}</p>
        <p>⭐️ 総合評価: {rating} / 5</p>

        <div className="conditions-icons">
          <span className="icon-tag">{conditions.leash}</span>
          <span className="icon-tag">{conditions.dogSize}</span>
          <span className="icon-tag">{conditions.area}</span>
          <span className="icon-tag">{conditions.vaccine ? '予防接種証明必要' : '証明不要'}</span>
        </div>

        <div className="google-map-placeholder" style={{ backgroundColor: '#eee', height: '150px', margin: '10px 0' }}>
          [Googleマップ埋め込みプレースホルダー]
        </div>

        <h4>訪問レポート</h4>
        <p>訪問日: 2025年X月X日 / 混雑度: {conditions.crowdedness}</p>

        <h5>良かったポイント</h5>
        <p>・{conditions.goodPoints}</p>

        <h5>注意点</h5>
        <p>・{conditions.badPoints}</p>

        <a href="#">詳細を見る（写真5〜8枚）</a>
      </div>
    </div>
  );

  const sampleSpots = [
    { name: '広大な芝生ドッグラン A', address: '東京都XX区XX', rating: 5, conditions: { leash: 'ノーリード可', dogSize: '全犬種OK', area: '屋外', vaccine: true, crowdedness: '休日(中)', goodPoints: '地面が芝生で足に優しい。水飲み場と足洗い場完備。', badPoints: '日陰が少ない。' } },
    { name: 'テラス席OKカフェ B', address: '神奈川県YY市YY', rating: 4, conditions: { leash: 'リード必須', dogSize: '全犬種OK', area: '屋外(テラス)', vaccine: false, crowdedness: '平日(少)', goodPoints: '犬用メニューがあり、店員さんがとても親切。', badPoints: 'テラス席は予約必須。' } },
  ];

  return (
    <div className="spots-page page-container">
      <h1>📍 Spots - とわと行くお出かけスポット</h1>
      <p>シェルティが楽しめるドッグラン、カフェ、公園、ホテル情報を紹介します。</p>

      {/* スポット検索/絞り込み機能のプレースホルダー */}
      <div className="spot-filter-bar" style={{ padding: '15px', border: '1px solid #444', marginBottom: '20px' }}>
        [カテゴリ、エリア、条件での絞り込みUI]
      </div>

      <div className="content-grid">
        {sampleSpots.map((spot, index) => (
          <SpotCard key={index} {...spot} />
        ))}
      </div>
    </div>
  );
};

export default Spots;