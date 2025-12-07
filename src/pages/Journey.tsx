// src/pages/Journey.tsx
import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
// Google Maps ライブラリをインポート
import { GoogleMap, useJsApiLoader, Polyline } from '@react-google-maps/api';

// ------------------------------------------------------------------
// 💡 データ定義: 世界一周ルートとゴール距離
// ------------------------------------------------------------------

interface Checkpoint {
  city: string;
  country: string;
  distance: number; // 累積距離 (km)
  fact: string; // その都市に関する楽しい事実
  lat: number;    // 緯度
  lng: number;    // 経度
}

const JOURNEY_GOAL_KM = 45000;

// 緯度経度を追加した通過地点データ
const checkpoints: Checkpoint[] = [
  // 緯度経度は概算です
  { city: '東京', country: '日本', distance: 0, lat: 35.6895, lng: 139.6917, fact: '旅の始まり！' },
  { city: 'ソウル', country: '韓国', distance: 1200, lat: 37.5665, lng: 126.9780, fact: '最初の通過地点！K-POPの本場。' },
  { city: 'ウラジオストク', country: 'ロシア', distance: 2800, lat: 43.1185, lng: 131.8858, fact: 'シベリア鉄道の東端です。' },
  { city: 'デリー', country: 'インド', distance: 6800, lat: 28.7041, lng: 77.1025, fact: 'タージ・マハルはここからすぐ。' },
  { city: 'カイロ', country: 'エジプト', distance: 11000, lat: 30.0330, lng: 31.2330, fact: 'ピラミッドまであと少し！' },
  { city: 'パリ', country: 'フランス', distance: 15500, lat: 48.8566, lng: 2.3522, fact: 'エッフェル塔を横目に休憩です。' },
  { city: 'ロンドン', country: 'イギリス', distance: 16000, lat: 51.5074, lng: -0.1278, fact: 'ビッグベンを目指しましょう！' },
  { city: 'ニューヨーク', country: 'アメリカ', distance: 23000, lat: 40.7128, lng: -74.0060, fact: '大西洋を渡り、アメリカ大陸へ上陸！' },
  { city: 'ロサンゼルス', country: 'アメリカ', distance: 27500, lat: 34.0522, lng: -118.2437, fact: 'ハリウッドの星を探しましょう。' },
  { city: 'リオデジャネイロ', country: 'ブラジル', distance: 34000, lat: -22.9068, lng: -43.1729, fact: '南米大陸を縦断中です！' },
  { city: 'ケープタウン', country: '南アフリカ', distance: 41000, lat: -33.9249, lng: 18.4241, fact: 'アフリカ大陸最南端に到着！' },
  { city: 'ゴール', country: '世界一周達成', distance: JOURNEY_GOAL_KM, lat: 35.6895, lng: 139.6917, fact: '✨ 世界一周達成！お疲れさまでした！' },
];

// ------------------------------------------------------------------
// 💡 マップコンポーネントの定義
// ------------------------------------------------------------------

interface JourneyMapProps {
  checkpoints: Checkpoint[];
  currentDistance: number;
}

const JourneyMap: React.FC<JourneyMapProps> = ({ checkpoints, currentDistance }) => {
  // 💡 環境変数からAPIキーを読み込む
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const MAP_ID = "YOUR_MAP_ID"; // カスタムMap IDがあれば設定 (任意)
  const libraries: ("geometry" | "drawing" | "places" | "visualization")[] = useMemo(() => ['geometry'], []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    id: 'google-map-script',
    libraries: libraries,
    mapIds: MAP_ID ? [MAP_ID] : undefined,
  });

  // 初期表示の中心点を設定 (東京)
  const defaultCenter = useMemo(() => ({ lat: 35.6895, lng: 139.6917 }), []);

  // マップのオプション
  const mapOptions = useMemo(() => ({
    zoom: 3, // 初期ズームレベル
    minZoom: 2,
    mapId: MAP_ID,
    disableDefaultUI: true, // デフォルトUIを非表示
    zoomControl: true,
  }), []);

  // 全チェックポイントの緯度経度をルートとして取得
  const routePath = useMemo(() =>
    checkpoints.map(cp => ({ lat: cp.lat, lng: cp.lng })),
    [checkpoints]
  );

  // 現在の進捗までのルートパスを取得
  const passedPath: { lat: number, lng: number }[] = [];
  let pathCompleted = false;

  for (let i = 0; i < checkpoints.length - 1; i++) {
    const start = checkpoints[i];
    const end = checkpoints[i + 1];

    // 次のチェックポイントまで完全に通過
    if (currentDistance >= end.distance) {
      passedPath.push({ lat: start.lat, lng: start.lng });
      passedPath.push({ lat: end.lat, lng: end.lng });
    }
    // 現在のセグメントの途中
    else if (currentDistance >= start.distance && currentDistance < end.distance && !pathCompleted) {
      passedPath.push({ lat: start.lat, lng: start.lng });

      // 現在位置をセグメントの中間に概算で設定
      const progressRatio = (currentDistance - start.distance) / (end.distance - start.distance);
      const currentLat = start.lat + (end.lat - start.lat) * progressRatio;
      const currentLng = start.lng + (end.lng - start.lng) * progressRatio;
      passedPath.push({ lat: currentLat, lng: currentLng });
      pathCompleted = true; // 描画終了
      break;
    } else if (pathCompleted) {
      break;
    }
  }

  const onLoad = useCallback((map: google.maps.Map) => {
    // 💡 現在地または最後の通過地点にマップをセンタリング
    const lastPassedCp = passedPath[passedPath.length - 1] || defaultCenter;
    map.panTo(lastPassedCp);
    map.setZoom(3);
  }, [passedPath, defaultCenter]);


  if (loadError) return <div className="map-error-notice">地図の読み込みに失敗しました。APIキーを確認してください。</div>;
  if (!isLoaded) return <div className="map-loading-notice">地図を読み込み中...</div>;

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '500px' }}
        options={mapOptions}
        center={defaultCenter}
        onLoad={onLoad}
      >
        {/* 💡 全体ルート (薄い線) */}
        <Polyline
          path={routePath}
          options={{
            strokeColor: '#ccc',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            zIndex: 1
          }}
        />

        {/* 💡 完了ルート (濃い線) */}
        <Polyline
          path={passedPath}
          options={{
            strokeColor: 'var(--primary-color)', // 例: オレンジ色
            strokeOpacity: 1.0,
            strokeWeight: 5,
            zIndex: 2
          }}
        />

        {/* マーカーが必要な場合はここに Marker コンポーネントを追加 */}

      </GoogleMap>
    </div>
  );
};


// ------------------------------------------------------------------
// 💡 バーチャル旅行ページコンポーネント (Journey)
// ------------------------------------------------------------------

const Journey: React.FC = () => {
  // 💡 散歩の累積距離 (仮データ: 実際は外部から取得する必要があります)
  // 例: ロンドンとニューヨークの間 (16000km〜23000km)
  const totalDistance = 18500;

  const percentage = Math.min(100, (totalDistance / JOURNEY_GOAL_KM) * 100);
  const remainingDistance = JOURNEY_GOAL_KM - totalDistance;
  const currentCheckpointIndex = checkpoints.findIndex(cp => cp.distance > totalDistance);
  const previousCheckpoint = checkpoints[currentCheckpointIndex - 1] || checkpoints[0];
  const nextCheckpoint = checkpoints[currentCheckpointIndex] || checkpoints[checkpoints.length - 1];

  // 次のチェックポイントまでの距離
  const distanceToNext = nextCheckpoint.distance - totalDistance;
  const segmentLength = nextCheckpoint.distance - previousCheckpoint.distance;
  const segmentProgress = segmentLength > 0 ? (totalDistance - previousCheckpoint.distance) / segmentLength * 100 : 0;


  // 距離を読みやすくするフォーマット関数
  const formatDistance = (distance: number) => distance.toLocaleString('ja-JP');

  return (
    <div className="journey-page page-container">
      <h1>🌍 とわのワールドツアー！</h1>
      <p>毎日の散歩距離を積み重ねて、世界一周の旅に挑戦中です！</p>

      {/* --- 1. マップ表示エリア --- */}
      <section className="map-section section-block">
        <JourneyMap checkpoints={checkpoints} currentDistance={totalDistance} />
        <p className="map-caption">**地図上の濃い線が現在の進捗です。**</p>
      </section>

      {/* --- 2. ゴール設定と概要 --- */}
      <section className="journey-summary section-block">
        <h2>🗓️ ツアー概要</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <h3>🌎 目標距離</h3>
            <p className="large-number">{formatDistance(JOURNEY_GOAL_KM)} km</p>
          </div>
          <div className="summary-card primary">
            <h3>🐾 現在の累積距離</h3>
            <p className="large-number">{formatDistance(totalDistance)} km</p>
          </div>
          <div className="summary-card secondary">
            <h3> remaining 残り距離</h3>
            <p className="large-number">{formatDistance(remainingDistance)} km</p>
          </div>
        </div>
      </section>

      {/* --- 3. 進捗バー --- */}
      <section className="journey-progress section-block">
        <h2>🧭 進捗状況 ({percentage.toFixed(2)}% 達成!)</h2>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          >
            {totalDistance > 0 && <span>{formatDistance(totalDistance)} km</span>}
          </div>
        </div>

        {/* --- 4. 現在地と次の目標 --- */}
        <div className="checkpoint-info">
          <p>
            現在、**{previousCheckpoint.city}（{previousCheckpoint.country}）** を通過し、<br />
            次の目的地 **{nextCheckpoint.city}（{nextCheckpoint.country}）** へ向けて旅を続けています！
          </p>
        </div>

        {/* --- 5. チェックポイント間の進捗 --- */}
        {nextCheckpoint.distance !== JOURNEY_GOAL_KM && (
          <div className="segment-progress-container">
            <span className="segment-start">{previousCheckpoint.city}</span>
            <div className="segment-bar">
              <div
                className="segment-bar-fill"
                style={{ width: `${segmentProgress.toFixed(2)}%` }}
              ></div>
            </div>
            <span className="segment-end">{nextCheckpoint.city}</span>
            <p className="distance-remaining">
              <small>次まであと: {formatDistance(distanceToNext)} km</small>
            </p>
          </div>
        )}
      </section>

      <hr />

      {/* --- 6. ルートマップ (チェックポイント一覧) --- */}
      <section className="route-map section-block">
        <h2>🗺️ ワールドツアールート</h2>
        <div className="route-list">
          {checkpoints.map((cp, index) => (
            <div
              key={cp.city}
              className={`route-checkpoint ${totalDistance >= cp.distance ? 'passed' : 'pending'}`}
            >
              <div className="pin">
                {totalDistance >= cp.distance ? '✅' : '📍'}
              </div>
              <div className="details">
                <span className="distance-label">{formatDistance(cp.distance)} km</span>
                <h4>{cp.city}, {cp.country}</h4>
                <p className="fact">{cp.fact}</p>
                {index > 0 && totalDistance < cp.distance && (
                  <small>（{formatDistance(cp.distance - totalDistance)} km先にあります）</small>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Journey;