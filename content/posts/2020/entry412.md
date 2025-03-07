---
title: 本当に怖いDNS（ネームサーバー）変更。予想外のトラブルに備えよう！
date: 2020-12-08
hero: thumbnail/2020/entry412.jpg
pageType: blog
cateId: web-developer
tags: ["サーバー引越し","しろたん師匠"]
description: サイト移行やDNS（ネームサーバー）変更、ちゃんと事前準備して行ってますか？最近ドメインをさくらサーバーからお名前.comへ移し、さらにサーバーもNetlifyへ移しました。移管中エラーを吐いて、ブログページが見れなくなってしまいました。事前準備を怠ったことを死ぬほど反省しました。体験談と対処法を綴ります。
---
サイト移行やDNS（ネームサーバー）変更、ちゃんと事前準備して行ってますか？<br>最近ドメインをさくらサーバーからお名前.comへ移し、さらにサーバーもNetlifyへ移しました。

移管中エラーを吐いて、ブログページが見れなくなってしまいました。事前準備を怠ったことを死ぬほど反省しました。体験談と対処法を綴ります。

<prof></prof>


## 大切なコンテンツが見れなくなっちゃう！準備をしっかりしてサイト引越しをすべし
今回サイト引越し中やらかして、ウェブサイトがおおよそ1日間見れなくなってしまいました。

以前も忙しすぎてサーバーかドメイン更新を見逃し、1週間位サイトが見れなくなりましたが大ダメージでした。**長期サイトが見れなくなるのはサイト運営者にとって脅威です**。

ざっくり対策は次の3つ。<br><br>

* DNS（ネームサーバー）の反映のタイムラグを理解しておく
* 旧サイトが健全に表示されるか確認し必要であればメンテナンスしておく
* 最悪の事態に備えてメンテナンス中ページも用意しておく

<br>連日のサイトのコーディングと記事移行がキツかったのもあり、*サイトをリニューアルできるのが嬉しすぎて*3つとも抜けていました。

<a href="https://px.a8.net/svt/ejp?a8mat=3BFREY+GE0L9U+50+2HCB1D" rel="nofollow">
<img border="0" width="100" height="60" alt="" src="https://www28.a8.net/svt/bgt?aid=200609674991&wid=001&eno=01&mid=s00000000018015006000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=3BFREY+GE0L9U+50+2HCB1D" alt=""/>

<small>※普段クライアントに対しては公開日などをきちんと確認しています。</small><br><br>

要因と対策をそれぞれご紹介します。

### DNS（ネームサーバー）反映は最大72時間も待たなければならない
トラブルがすぐに収束しなかった理由は、*DNS（ネームサーバー）反映のタイムラグ*です。

DNS（ネームサーバー）の変更は、たとえ変更手続きが終わっていてもインターネット全体に反映するまで**24時間から72時間程度**かかります。

インターネットはルーター、個人のパソコン、サーバー側、さまざまなところにキャッシュが残るような仕組みになっています。

ちなみにフィリピンには3大インターネット会社があり、私はスマホをGlobe、自宅ではPLDTを使っています。<br>
インターネット会社でも反映時間の格差があり、Globeは1日、PLDTは2日かかりました。<br><br>

もしこれが*72時間かかっていたら*と思うとゾッとします。<br><br>

不足のトラブルがあると想定し、できるだけ**PV（閲覧数）の少ない時間にDNS（ネームサーバー）変更をすべき**です。

PVはGoogleAnalyticsなどで確認できます。

サイトの系統にもよりますが、金曜日の深夜から日にかけて作業するのがオススメです。

<a href="https://px.a8.net/svt/ejp?a8mat=3BFREY+GE0L9U+50+2I3QOX" rel="nofollow">
<img border="0" width="468" height="60" alt="" src="https://www26.a8.net/svt/bgt?aid=200609674991&wid=001&eno=01&mid=s00000000018015134000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3BFREY+GE0L9U+50+2I3QOX" alt=""/>


ただ、サーバー会社にお問い合わせができないのである程度覚悟しておいてください。<br><br>

<div class="box">
<em>予想外のトラブルを想定し、できるだけ被害の少なくて済む日にDNS（ネームサーバー）の変更をする</em>
</div>

### 反映するまで旧サイトが健全な状態で表示されている状態を保つ
本来問題がなければ、旧サイトと新サイトは徐々に入れ替わる予定でした。

しかし急に今回記事詳細ページのみ表示されなくなりました。

原因はAMP対応したくてクセの強いPHPのメソッドを使っていたからです。

>#### AMP
>Accelerated Mobile Pagesの略で*アンプ*と読みます。モバイルユーザーが快適にホームページを閲覧できるようにすることを目的としてGoogleとTwitterが共同で立ち上げたオープンソースプロジェクトで、一般的にはモバイル端末でホームページを高速で表示させるための仕組み。

リニューアルでは*新サイトに注目しがち*です。

旧サイトが健全な状態で表示されている状態をキープできるよう事前に、**クセの強いメソッドなど、変なコード書いてないか確認しておくべき**でした。<br><br>

<div class="box">
<em>旧サイトが健全に表示されるように事前メンテナンスをしておく</em>
</div>

#### なぜ記事詳細ページだけ表示されなくなったのか。PHP file get contentで予想外のエラー
原因は`file_get_contents`（PHP）でした。

> #### file get contents
> ファイルの内容を全て文字列として読み込むメソッド

AMPではhead内にCSSを直書きしなければならないのですが、私はいつもSCSSでCSSを書いているので修正入ったら書き直すなんてめんどくさい。

コンパイルしたAMP用のCSSファイルをパッケージ内に置き、`file_get_contents`で読み込んでました。

```
ginneko-atelier/
  └ themes/
    └ ginneko-atelier/
	  ├ amp.php
	  └ amp.css
```

徐々に反映が進むと、`file_get_contents`で取得しているファイルが中途半端に反映してかNetlify側のサーバーから取得している形になりました。

今回Netlifyに載せ替えるサイトはGatsbyの静的ジェネレーターなので以前と構造がまったく違います。当然Netlifyに同じファイルがないので*AMP対応していたページがすべてエラー*を吐いてしまいました。<br><br>

ちなみにAMP対応で、`file_get_contents`を使う方法が紹介されています。みなさんもご注意を。<br><br>

[APIなどに file get contents を使うのはオススメしない理由と代替案](https://qiita.com/shinkuFencer/items/d7546c8cbf3bbe86dab8)


### トラブルはある！ぐらいの心づもりでメンテナンス中ページも用意しておく
トラブルは起こる。うまくいかない可能性を考えて、どうしても復旧できなかった時のために*メンテナンスページを必ず用意*しておきましょう。

500番エラーを出すよりマシです。

そうすればユーサーはまたページに戻ってきてくれます。

トラブルが発生したら、いったん**メンテナンスページに差し替えリダイレクト**かけておきましょう。

以下は、.htaccessのコードです。

```bash
ErrorDocument 503 /maintenance.html #表示させるメンテナンスページ

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^.*$ - [R=503,L]
</IfModule>

<IfModule mod_headers.c>
  Header set Retry-After "Fri, 13 February 2018 09:00:00 GMT" #メンテナンス終了予定時刻を設定
</IfModule>
```

<br><div class="box">
<em>トラブルはあって当然。表示されなかった時の対処法も用意しておく</em></div>

## どうしようもないときは諦めよう
ちなみに私は焦りのあまりさくらサーバー側の設定を触りすぎて、SSLまで効かなくなり手の施しようがなくなりました。<br><br>

そんな時ほど**人間諦めが肝心**。<br><br>

最低でも24時間ぐらいかかるみたいだし、開き直って他の作業をしました。

翌日も気にせず友達とLandersに買い物へ行ってジャンク祭りを堪能。

![友達とLandersに買い物へ行ってジャンク祭り](./images/12/entry412-1.jpg)

[スーパーマーケット Landers](https://goo.gl/maps/dwUh5CFc3Edo1SRy8)

そんなことをしていると、いつの間にか反映していました。

### 嬉しいリニューアル効果
ページ読み込みのストレスは軽減し、UXが向上したおかげで*PVも1.5倍まで伸びました!!!*<br>
反映までの1、2日は辛かったけど、喜びはひとしおです。<br><br>

**リニューアルサイコー！**

## まとめ
今回私が痛い目にあったDNS変更に関する経験と対処法についてシェアさせていただきました。

ちなみに以前*DNS変更がいかに怖いか*って内容をITセミナーで話をしていたことが発覚しました。。。<br><br>

しかも、DNS変更の作業は**爆弾撤去作業のように神経を使う**と説明までしておりました。。。<br><br>

![サイト引越しの際に学んだ5の教訓](./images/12/entry412-2.png)

[サイト引越しの際に学んだ5の教訓 | Slide Share](https://www2.slideshare.net/yurikamimori/5-239853511)

[第90回「WEB TOUCH MEETING](http://www.webtouchmeeting.com/meeting/90web-touch-meeting.html)

DNS変更は慎重に！

みなさんのWeb制作ライフの一助となれば幸いです。

最後までお読みいただきありがとうございました。

<a href="https://px.a8.net/svt/ejp?a8mat=3BFREY+GE0L9U+50+2HK0TD" rel="nofollow">
<img border="0" width="350" height="80" alt="" src="https://www20.a8.net/svt/bgt?aid=200609674991&wid=001&eno=01&mid=s00000000018015042000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3BFREY+GE0L9U+50+2HK0TD" alt=""/>
