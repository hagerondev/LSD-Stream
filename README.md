# LSD Streaming Platform

マルチアングル配信プラットフォーム

# Tech

## インフラ
* 配信サーバ : LightSail (AWS) × 4台
* コメントサーバ : EC2 (AWS)
* 視聴ページ：GitHub Pages (+バックアップ用にEC2)

## バックエンド

### 配信

* Nginx + rtmp-module
* rtmp → hls

### コメント

* json + websockets (Python)

## フロントエンド
* Next.js
* Tailwind CSS
* hls.js

## 現地
* LiveShell X 4台 (+1台 YouTube用)
* PXW-Z90 6台