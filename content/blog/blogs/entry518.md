---
title: PageSpeed Insights スコアを大幅に改善した話【経過報告】
date: 2023-01-28
pagetype: blog
hero: thumbnail/2023/entry518.jpg
cateId: seo
tags: ["WordPress","Web解析"]
description: コアウェブバイタルの CLS 0.1「改善が必要」になったらどうする。全体的にも PageSpeed Insights のパフォーマンス評価がいつの間にかモバイル21までダウン。そこで、パフォーマンス評価を上げるために短期間ででやった対策を細かくご紹介します。フロントエンド側でできること。
---
Search Console をチェックしていたら、すべてのページが *コアウェブバイタル上「改善が必要」* とのアラートが出てました汗。

以下3つの指標のうち、CLS が 0.1 超で不合格とのこと。。。

* *LCP（Largest Contentful Paint）* 一番大きいコンテンツ（画像やテキスト）が時間をかけずに表示されるか
* *FID（First Input Delay）* ユーザーがページ内で初めてクリック等のアクションを起こした際の応答時間
* *CLS（Cumulative Layout Shift）* 予期しないページレイアウトのずれが起きないか

細かく [PageSpeed Insights](https://pagespeed.web.dev/) で見ても、パフォーマンス評価がいつの間にかモバイル21まで落ちていて驚愕しました。

*改善前のPageSpeed Insightsによるパフォーマンス評価*

|パソコン|モバイル|
|-|-|
|69/100|21/100|

このWebサイトはそもそもスピード改善のために2年位前に静的サイトジェネレーターに苦労して移行しました。

静的ジェネレータだし、ほっといても大丈夫と思い特に何もしてなかったです。絶望的だったのですが、、、

<msg txt="PageSpeed Insights のアラートをできる範囲で解消したら、ボトルネックだったCLSは0になりました！"></msg>

この記事ではフロントエンド側でできることを中心に、PageSpeed Insights のパフォーマンス評価をモバイルで *最大40以上スコアを改善した方法* をご紹介します。

<toc id="/blogs/entry518/"></toc>

*改善後PC*
![改善後PC](./images/2023/01/entry518-1.jpg)

*改善後モバイル*
![改善後モバイル](./images/2023/01/entry518-2.jpg)

トップページは記事とは違ってコンテンツは少ないので、PC版ではパフォーマンス100まで行きました！

![改善後PC](./images/2023/01/entry518-3.jpg)

## CLS（Cumulative Layout Shift）改善を図る
画像や広告などが遅れて読み込まれ、突然レイアウトがズレたり変わったりする現象のことをレイアウトシフトと呼びます。

起きる原因としては、

* 読み込みが遅れた画像・動画等のメディアコンテンツ
* Webフォント

等です。

<p>CLSはそのズレの大きさを指し、0.1未満が理想です。<br><small>※ CLS の数値「ずれが生じた表示領域の比率 × 距離の比率」</small></p>


ちなみに 0.1以上で **改善が必要**、 0.25 以上で **不良** となります。


*チェックポイント*
* 画像・動画等ののheight・width属性などのサイズに関する記述漏れはないか？
* Reactなどによる再レンダリング
* Webフォントの読み込み対策

Webフォントは全てに悪影響が会ったので採用を諦めました。ベストプラクティスが見つかれば後日追記します。

### 画像・動画等ののheight・width属性などのサイズを指定する
画像や動画（iframe含む）はheight・widthやアスペクト比を指定します。

```HTML
<img src="****.png" width="400" height="300" alt="**">
<!-- もしくは -->
<img src="****.png" style="aspect-retio:4/3" alt="**">
```
CSSから直接指定してもOKです。

### Reactなどによる再レンダリングを防ぐ
React ではコンポーネントが再レンダリングされることによっておこることがあります。その場合は `useMemo` を使って解決できることもあります。

<card id="/blogs/entry430/"></card>

## 画像をギリギリまで小さくし、徹底的に圧縮
すべての指標において画像圧縮は即効性があります。

<msg txt="スピード改善において一番画像のりサイズと圧縮が効果的。PageSpeed Insight のスコアが落ちたらすぐできる対策です。"></msg>

*チェックポイント*
* 画像は可能な限り圧縮し、ギリギリまで小さくリサイズする
* 画像フォーマットは適切なものを使う
* `picture` タグを使ってユーザーの環境に応じて画像を出し分ける
* スクロールするまで見えない箇所の画像には `loading=lazy` や `decoding=async` を付与する


### 画像はは可能な限り圧縮し、ギリギリまで小さくリサイズする
WordPressなどでもプラグインなどで圧縮して画像を使うとしても対した場所に使わない場合は、ギリギリまで圧縮します。

どんなに圧縮できたとしても、元画像が大きいと限界があります。オンライン画像圧縮サービス、Photoshop など何でもツールはあるので使いやすいものを使って圧縮します。

私のケースではCLスクリプトを使ってまとめて画像を圧縮しました。

<card id="/blogs/entry423/"></card>

### 画像フォーマットは適切なものを使う
こちらは普段から気をつけてますが、画像の種類によってフォーマットを使い分けます。

主にはPNGとJPEGを使い分けるのですが、目安としては色変数が少ないのっぺりした画像はPNG、写真のような色が細かいは JPEG にするようにしています。

また、最近では IE のことも気にしなくて良くなり、Safariにも対応したので次世代フォーマット WebP も積極的に使うようにしています。


*GatsbyImageの場合*

|プロパティ|値|
|-|-|
|*gatsbyImageData*|width: 400|
|*quality*|40|

アイキャッチは最大表示より大きくならないようにし、さらに画質を落とす設定をしました。

GatsbyImage の画像出力もJSを使っているので、少なからず負担はかかります。

関連記事一覧に使っているようなどんなディバイスで見ても最初から小さいサムネイルに関しては、切り替えの必要のない場合は GatsbyImage を使わず、固定サイズにする等設置する場所によって変えました。

```html
<img src="/static/e125eedc96f48cf84970b86946ba6be1/2cbcf/entry466.WebP" alt="test" width="254" height="190" loading="lazy" decoding="async">
```

#### GIFアニメ は古い。画像フォーマットを WebP に変える
GIFアニメ はサイトの表示スピードを遅くする原因となります。

私は、サイト内で結構 GIFアニメを使っていましたが、 WebPアニメーションに変更しました。

*アニメ画像に変換する君* というフリーソフトをICSメディアさんが出しているらしいのですが、Mac の M1チップには対応していないらしく今回はオンラインツールを使いました。

まずは[gifから動画に変換](https://express.adobe.com/ja-JP/tools/convert-to-mp4)し、[動画からアニメWebP生成](https://ao-system.net/videowebp/)に変換。

<p><small>※ gatsbyImage で圧縮すると、アニメーションがなくなってしまったので直起きしました。</small></p>

```html:title=WebPアニメ用
<figure><img src="/images/animation/2022/entry515-6.WebP" width="468" height="136" alt="noUiSlider Tooltip" decoding="async" loading="lazy"></figure>
```

WebPアニメーションは FireFox、Chrome、Safari でも動くし、このブログに関してはユーザーはほぼPCなので問題なし。

### pictureタグを使ってユーザーの環境に応じて画像を出し分ける

このWebサイトはGatsbyImageで画像出力しているので基本は WebP で軽量化された状態で出力されます。

しかも、srcsetなどでユーザー環境に応じてユーザーのディバイスに応じて出し分けされています。

画像のサイズがある程度大きな場合に重宝します。

```html:title=pictureタグ
<picture>
  <source type="image/WebP"　srcset="/static/069bc468dd96c224d5c16811d36dce60/dbc4a/camille-pic.WebP 50w,/static/069bc468dd96c224d5c16811d36dce60/d8057/camille-pic.WebP 100w,/static/069bc468dd96c224d5c16811d36dce60/2e34e/camille-pic.WebP 200w,/static/069bc468dd96c224d5c16811d36dce60/416c3/camille-pic.WebP 400w" sizes="(min-width: 200px) 200px, 100vw">
  <img width="200" height="200" data-main-image="" sizes="(min-width: 200px) 200px, 100vw" decoding="async" src="/static/069bc468dd96c224d5c16811d36dce60/dd515/camille-pic.jpg" srcset="/static/069bc468dd96c224d5c16811d36dce60/6ac16/camille-pic.jpg 50w,/static/069bc468dd96c224d5c16811d36dce60/e07e1/camille-pic.jpg 100w,/static/069bc468dd96c224d5c16811d36dce60/dd515/camille-pic.jpg 200w,/static/069bc468dd96c224d5c16811d36dce60/47930/camille-pic.jpg 400w" alt="かみーゆ" style="object-fit: cover; opacity: 1;">
</picture>
```

WordPress などでもデフォルトでpictureタグを使ってユーザーの環境に応じて画像のだ仕分けができまが、WebPも対応する場合はプラグインなどを使うといいと思います。

## DOMの整理
過剰なタグ数やネストの深さは *過大な DOM サイズ* となり、レンダリングに悪影響を及ぼします。

ページが読み込めないので、結果 FID（First Input Delay）などにも悪影響を及ぼします。

各項目がこちらの表以上の数になると、PageSpeed Insight で警告が出ます。

|項目|数|
|-|-|
|*DOMの最大深さ*|32 以上|
|*子要素の上限数*|60 以上|
|*合計DOM要素数*|1,500 以上|

*チェックポイント*
* タグのネスト（入れ子）を浅くする
* タグ数を減らす

このサイトは最大200近くタグが使われていることがわかりました。

![改善後PC](./images/2023/01/entry518-4.png)

### タグのネスト（入れ子）を可能な限り浅くする

GatsbyJS も React なのでコンポーネントはいちいち `div` などでラップするので、必然的にネストが深くなります。不必要なタグは可能な限り取り除きます。

### ユーザーに見向きもされないパーツは削除
Clarityなどのヒートマップを使ってユーザーにクリック/タップされていない要素を削除します。Clarityの使い方は以下記事で解説しています。

<card id="/blogs/entry510/"></card>

解析した結果、[せっかく苦労して実装した GatsbyJS のタグクラウド](/blogs/entry486/)ですが、*無駄にタグが生成されるくせにほとんどクリックされていないことが発覚* しました。

![タグクラウド](./images/2022/01/entry486-1.jpg)

要素が虚しく増えるだけなので削除しました。

### コードハイライターの自動出力がネック
当サイトではコードハイライターを利用していますが、これが結構クセモノで、コードをハイライトするために無数の `span` タグが自動生成されます。

![コードをハイライトするために無数の span タグが自動生成される](./images/2023/01/entry518-5.png)

もし、WordPress などの CMS であれば CodePen などの埋込外部サービスを使うのもありかもです。

React であれば `react-window`、`Effect` を使っている場合は `shouldComponentUpdate`、`PureComponent`、`React.memo` あたりで不要な再レンダリングを抑える事ができるらしいです。

今回は対応できなかったので次回の宿題です。

## 第三者リソース読み込みの改善

*チェックポイント*
* 可能なものは遅延読み込みする
* 不要であれば削除

第三者リソースとはGoogleタグマネージャー、Googleアナリティクス、Clarity や Googleフォントなどです。
切ないくらいボトルネックとなります。

### Adsense のみ遅延読み込み
Google タグマネージャーなどのJSはかなり足を引っ張ります。タグマネージャーなどのサイト計測系のタグは遅延読み込みすると誤ったデータが取れては困るので遅延読み込み対応策が講じれません。しかし、 *AdSense なら遅延読み込みで改善* できます。

AdSense を入れている方なら、これだけでも随分改善が見込めます。

Googleタグマネージャー経由、あるいは WordPress などでプラグイン経由ではなく *直にタグを読み込み* 、ユーザーがスクロールしたら読み込みします。。

```JS:title=JavaScript
let lazyloadads = false;
window.addEventListener("scroll", function() {
  if ((document.documentElement.scrollTop !== 0 && lazyloadads === false) || (document.body.scrollTop !== 0 && lazyloadads === false)) {
    (function() {
        const ad = document.createElement('script');
        ad.setAttribute('data-ad-client', "****")//AdsenseのID
        ad.async = true;
        ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        const sc = document.getElementsByTagName('script')[0];
        sc.parentNode.insertBefore(ad, sc);
    })();
    lazyloadads = true;
  }
}, true)
```

GatsbyJS で AdSense を遅延読み込みしたいときは上記コードだとコンパイルでコケるので Helmet 内に以下のように記載します。
```JS:title=GatsbyJS/Helmet
if( typeof window !== "undefined") {
    let lazyloadads = false;
    window.addEventListener("scroll", function() {
     if ((document.documentElement.scrollTop !== 0 && lazyloadads === false) || (document.body.scrollTop !== 0 && lazyloadads === false)) {
        (function() {
            const ad = document.createElement('script');
            ad.setAttribute('data-ad-client', "****")
            ad.async = true;
            ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            const sc = document.getElementsByTagName('script')[0];
            sc.parentNode.insertBefore(ad, sc);
        })();
        lazyloadads = true;
      }
    }, true)
  }
```
### Webフォントを使うのをやめる
Googleフォントも結構ネックでした。

Webフォントは[レイアウトシフト](#clscumulative-layout-shift%E5%AF%BE%E7%AD%96)を起こす原因にもなります。

<msg txt="テックブログにデザインを求めてくる人はおるまい！"></msg>

ポートフォリオページ以外、思い切って使うのをやめました。いっそのこと阿部寛の公式サイトぐらいさっぱりしていてもいいかも。

## メインスレッド処理の最小化・不要なJSを削除する
メインスレッド処理の最小化をするようにアラートが出たら、主に JavaScript の解析、コンパイル、実行に時間がかかっているということです。

*チェックポイント*
* 主に負荷をかけているJSの改善、不要であれば削除
* 使っていないプラグインは削除し、CSSで代用できるものは置き換え


私のサイトでは改善前は *Script Evaluation* が 6,000ms 前後ありました。

使っていないサイズの大きな JavaScript のコードを整理したり削除し半分以下の 3,000ms 以内に抑えることができました。

GatsbyJSの場合はどの JS が負荷をかけているか `gatsby-plugin-webpack-bundle-analyser-v2` で解析できます。

インストール方法などは[こちら](https://www.gatsbyjs.com/plugins/gatsby-plugin-webpack-bundle-analyser-v2/)を参考に。

### 主に負荷をかけているJSの改善、不要であれば削除
解析した結果からサイズの大きなコンポーネントを見直します。

#### FontAwesome が負荷をかけていたので使うのをやめる
解析した結果、Reactモジュール経由で実装した FontAwesome がそれぞれのページで一番負荷をかけていました。

大した数を使っていなかったのでアイコンはすべてインラインのSVGで実装、スタイルはCSSで整えました。

#### 意外なコンポーネントがサイズの大きなことも。必要に応じて改修もしくは削除
当サイトの記事ではではサムネイルの横にカテゴリーに応じて小さな文字を出力していたのですが、これが想像以上に負荷をかけていました。

一旦は削除しましたがCSSで実装し直すことも検討しています。

### 使っていないプラグインは削除、CSSで代用できるものは置き換え
上に戻るボタンにしか使っていないプラグインは削除し、CSSの `scroll-behavior: smooth;` に置き換えました。

何の目的で、いつインストールしたかわからない Twitter の埋め込み用プラグインも見つけたので削除。

## まとめ・PageSpeed Insights の警告を一つづつ読み解けば必ず改善する
今回は PageSpeed Insights の問題だったCLSを0まで改善し、モバイル最大で40以上パフォーマンススコアを改善させました。


<msg txt="忙殺されていて、長い間ひどい状態で放置してしまいました。。。"></msg>

幸いなことにこの銀ねこアトリエユーザーの殆どは、今どき珍しくPCユーザー。なので表示スピードでの大きなご迷惑はかけていないと信じています。

ひとまずマシになって良かったです。

今後の課題は巨大なDOMをどうするかです汗。まだまだ課題はありますので引き続き、改善に取り組み詳細をレポートしていきます。

この記事が、皆さんのWebサイト改善にお役に立てれば幸いです。

最後までお読みいただきありがとうございました。
