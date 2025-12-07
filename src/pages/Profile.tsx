// src/pages/Profile.tsx
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart, 
  Line,      
  CartesianGrid, 
  XAxis,     
  YAxis,     
  Tooltip,   
  Legend,    
  ResponsiveContainer
} from 'recharts';
import React from 'react'; // Reactをインポート

// 💡 assetsフォルダから画像をインポート
import sleep from '../assets/nesugata.jpg';
import walk from '../assets/sanpo.jpg';
import dogrun from '../assets/dogrun.jpg';

// ----------------------------------------------------
// 💡 成長データ定義 (体重・体高)
// ----------------------------------------------------
// ----------------------------------------------------
// 💡 成長データ定義 (体重・体高)
// ----------------------------------------------------
const growthData = [
  { month: 0, weight: 0.335, height: 18.0 }, 
  { month: 1, weight: 1.5, height: 20.5 },   
  { month: 2, weight: 2.6, height: 24.0 },   
  { month: 3, weight: 5.5, height: 28.0 },   
  { month: 4, weight: 7.0, height: 31.0 },   
  { month: 5, weight: 8.0, height: 33.0 },
  { month: 6, weight: 9.0, height: 35.0 },
  { month: 7, weight: 9.5, height: 36.0 },
  { month: 8, weight: 10.0, height: 36.5 },
  { month: 9, weight: 10.5, height: 36.8 },
  { month: 10, weight: 11.0, height: 37.0 }, // 実測値
  { month: 11, weight: 11.2, height: 37.0 },
  { month: 12, weight: 11.3, height: 37.0 }, 
];

// ----------------------------------------------------
// 💡 成長グラフコンポーネント
// ----------------------------------------------------
const GrowthChart: React.FC = () => {
  // Y軸の最大値を体重に合わせて調整
  const maxWeight = Math.max(...growthData.map(d => d.weight)) + 1;
  // Y軸の最大値を体高に合わせて調整
  const maxHeight = Math.max(...growthData.map(d => d.height || 0)) + 3;

  return (
    // 💡 グラフをレスポンシブコンテナで囲み、画面幅に合わせて調整
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={growthData}
        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
      >
        {/* X軸: 月齢 */}
        <XAxis 
            dataKey="month" 
            tickFormatter={(value) => `${value}ヶ月`} 
            stroke="#5d4037" 
            label={{ value: '月齢', position: 'insideBottom', dy: 10, fill: '#5d4037' }}
        />
        
        {/* Y軸(左): 体重 (kg) */}
        <YAxis 
            yAxisId="weight" 
            domain={[0, maxWeight]} 
            stroke="#ff9f6f" 
            label={{ value: '体重 (kg)', angle: -90, position: 'insideLeft', fill: '#ff9f6f', dx: -5 }} 
        />
        
        {/* Y軸(右): 体高 (cm) */}
        <YAxis 
            yAxisId="height" 
            orientation="right" 
            domain={[0, maxHeight]} 
            stroke="#64b5f6" 
            label={{ value: '体高 (cm)', angle: 90, position: 'insideRight', fill: '#64b5f6', dx: 15 }} 
        />
        
        {/* グリッド線 */}
        <CartesianGrid strokeDasharray="3 3" stroke="#ffeadb" />
        
        {/* ツールチップ (ホバー時の情報表示) */}
        <Tooltip 
            formatter={(value, name) => {
                // 💡 修正箇所: nameが文字列であることを確認する型ガードを追加
                const nameStr = typeof name === 'string' ? name : '';
                const unit = nameStr.includes('体重') ? 'kg' : 'cm';
                
                // 戻り値の配列の形式は [表示する値, 凡例]
                return [`${value} ${unit}`, name];
            }}
        />
        
        {/* 凡例 */}
        <Legend wrapperStyle={{ paddingTop: '10px' }} />

        {/* 💡 体重の折れ線グラフ */}
        <Line 
            yAxisId="weight" 
            type="monotone" 
            dataKey="weight" 
            name="体重" 
            stroke="#ff9f6f" 
            strokeWidth={3}
            dot={{ r: 5, fill: '#ff9f6f' }} 
            activeDot={{ r: 8 }} 
        />
        
        {/* 💡 体高の折れ線グラフ (データがない箇所は途切れる) */}
        <Line 
            yAxisId="height" 
            type="monotone" 
            dataKey="height" 
            name="体高" 
            stroke="#64b5f6" 
            strokeWidth={3}
            dot={{ r: 5, fill: '#64b5f6' }} 
            activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// ----------------------------------------------------
// 💡 性格データ定義
// ----------------------------------------------------
// 各項目を5段階評価で定義します。
const personalityData = [
  { subject: 'やんちゃ度', A: 5, fullMark: 5 },
  { subject: '甘えん坊度', A: 4, fullMark: 5 },
  { subject: '食いしん坊度', A: 5, fullMark: 5 },
  { subject: '賢さ', A: 3, fullMark: 5 },
  { subject: '社交性', A: 3, fullMark: 5 },
  { subject: '警戒心', A: 4, fullMark: 5 },
];

// ----------------------------------------------------
// 💡 レーダーチャートコンポーネント
// ----------------------------------------------------
const PersonalityChart: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="80%" 
                data={personalityData}
            >
                {/* 蜘蛛の巣グリッド線 */}
                <PolarGrid stroke="#ffeadb" /> 
                
                {/* 軸ラベル (やんちゃ度、甘えん坊度など) */}
                <PolarAngleAxis 
                    dataKey="subject" 
                    stroke="#5d4037" 
                    tickFormatter={(value) => `${value}`}
                />
                
                {/* 軸スケール (1, 2, 3, 4, 5のメモリ) */}
                <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 5]} 
                    tickCount={6} 
                    stroke="#5d4037"
                    tick={{ fill: '#5d4037', fontSize: 12 }}
                />
                
                {/* データのプロット (とわちゃんの性格のグラフ本体) */}
                <Radar 
                    name="Towa's Personality" 
                    dataKey="A" 
                    stroke="#ff9f6f" 
                    fill="#ff9f6f" 
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

// ----------------------------------------------------
// 💡 年齢計算関数
// ----------------------------------------------------
const calculateAge = (birthdayString: string) => {
  const birthday = new Date(birthdayString);
  const today = new Date();

  const diffTime = today.getTime() - birthday.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 年齢と月齢の計算
  const years = Math.floor(diffDays / 365.25);
  const monthsTotal = Math.floor(diffDays / 30.4375); // 平均月の日数
  const months = monthsTotal - (years * 12);

  if (years > 0) {
      return `${years}歳${months}ヶ月`;
  } else {
      return `${monthsTotal}ヶ月`;
  }
};

// ----------------------------------------------------
// 💡 定数定義
// ----------------------------------------------------
const BIRTHDAY = '2025-02-03'; // 誕生日を定数として定義

const Profile = () => {
  // 💡 年齢を計算して変数に格納
  const currentAge = calculateAge(BIRTHDAY);

  return (
    <div className="profile-page page-container">
      <h1>👤 Profile - シェルティ とわ のすべて</h1>

      {/* About Towa（とわについて） */}
      <section className="about-towa section-block">
        <h2>About とわ</h2>
        
        {/* 基本情報カード */}
        <div className="info-card-wrap content-grid">
          <div className="info-card content-card">
            <h3>基本情報</h3>
            <ul>
              <li>名前: とわ (Towa)</li>
              <li>犬種: シェットランドシープドッグ</li>
              {/* 💡 誕生日を定数で表示 */}
              <li>誕生日: {BIRTHDAY.replace(/-/g, '.')}</li> 
              {/* 💡 年齢を自動計算で表示 */}
              <li>年齢: {currentAge}</li>
              <li>体重: 11 kg</li>
              <li>毛色: セーブル＆ホワイト</li>
            </ul>
          </div>
          <div className="info-card content-card">
            <h3>好きなもの / 苦手なもの</h3>
            <p>好きなもの: テニスボール、KONG、さつまいも、お昼寝</p>
            <p>苦手なもの: ドライヤーの音、留守番、ルンバ</p>
          </div>
        </div>

        {/* 性格の詳細説明 */}
        <h3>性格の詳細</h3>
        <p>とわは非常に活発で好奇心旺盛な性格です。特に新しいおもちゃや匂いを見つけると、目を輝かせて探検を始めます。やんちゃなエピソードとしては、夜中にクッションフロアを剥がして部屋の中をぐちゃぐちゃに。。。その反面、飼い主が隣の部屋にいると「くぅん」と寂しそうな声で呼んでくることもあります。</p>
        
        <h3>チャームポイント</h3>
        <p>耳が完全に垂れている「ドロップイヤー」と、走ると風になびくふさふさの尻尾です。</p>
      </section>

      {/* Personality（性格診断） */}
      <section className="personality-section section-block">
                <h2>Personality - 性格レーダーチャート</h2>
                
                {/* 💡 レーダーチャートの表示 */}
                <div className="radar-chart-container">
                    <PersonalityChart />
                </div>
                
                <h3>各項目の解説</h3>
                <p><strong>やんちゃ度 (5/5):</strong> 毎日家を駆け回り、遊びの誘いを欠かしません。</p>
                <p><strong>甘えん坊度 (4/5):</strong> 撫でてほしいときは、そっと手を舐めてアピールします。</p>
                <p><strong>食いしん坊度 (5/5):</strong> ご飯の時間は秒速！好き嫌いなしの食いしん坊です。</p>
                <p><strong>賢さ (3/5):</strong> 基本的なコマンドは理解しますが、気分屋で集中力は低めです。</p>
                <p><strong>社交性 (3/5):</strong> 人見知りはまったくありません。ワンちゃんにはよく追いかけられています</p>
                <p><strong>警戒心 (4/5):</strong> 寝ていても少しの物音で飛び起きますが、寝ぼけているのか「はえ？」って顔をしています</p>
            </section>

      {/* Growth（成長記録） */}
      <section className="growth-section section-block">
        <h2>Growth - 成長記録</h2>
        <div className="timeline-placeholder">
          {/* タイムライン形式のプレースホルダー */}
          <article className="timeline-event">
            <h4>生後2ヶ月: 我が家にやってきた日</h4>
            {/* [Photo of Towa as a puppy] */}
            <p>初めての環境で少し緊張気味でしたが、すぐに慣れて家中を探検し始めました。初日にはヘソ天で寝ていました</p>
            <img src={sleep} alt="我が家に来たばかりのとわの子犬写真" className="timeline-image" />
          </article>
          <article className="timeline-event">
            <h4>生後6ヶ月: 初めてのはじめての散歩</h4>
            <p>知らない世界ばかりで戸惑っていました。</p>
            <img src={walk} alt="散歩デビューの写真" className="timeline-image" />
          </article>
          <article className="timeline-event">
            <h4>生後8ヶ月: ドッグランデビュー</h4>
            <p>家以外で走り回れる広場があることをはじめて知ったとわ。他のワンちゃんと一緒に全力で駆け回ってました。</p>
            <img src={dogrun} alt="ドッグランデビューの写真" className="timeline-image" />
          </article>
          {/* ... その後の記録を写真付きで追加 ... */}
        </div>
        
        {/* 体重・体高変化グラフの表示 */}
        <div className="growth-graph-placeholder">
          <GrowthChart /> 
        </div>
      </section>
    </div>
  );
};

export default Profile;