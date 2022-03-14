# LSD Streaming Platform

マルチアングル配信プラットフォーム

# Tech

## インフラ
* 配信サーバ : LightSail (AWS)
* コメントサーバ : EC2 (AWS)
* 視聴ページ：GitHub Pages

## バックエンド

### 配信

* Nginx + rtmp-module
* rtmp push
* hls pull

### コメント

* websockets (Python)

## フロントエンド
* Next.js
* Tailwind CSS
* hls.js

## 現地
* LiveShell X 複数台
* PXW-Z90 複数台