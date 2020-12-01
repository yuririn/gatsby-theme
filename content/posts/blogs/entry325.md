---
title: Webサイトの表示速度を真剣に考える
date: 2019-06-21
hero: entry325.png
pagetype: blog
category: SEO
cateId: seo
tags: ["seo","Gulp","SCSS"]
description: 昔いた会社で、画像の圧縮、CSSなどの外部ファイルを徹底して不要ファイルを削除して圧縮してさらにワンソース化した結果、50位から20位以内に順位が改善したことがあります。今日はWebサイトの軽量化とスピードについて真剣に考えようと思います。
lead: ["フロントエンドエンジニアのかみーゆです。","昔いた会社で、画像の圧縮、CSSなどの外部ファイルを徹底して不要ファイルを削除して圧縮してさらにワンソース化した結果、50位から20位以内に順位が改善したことがあります。","今日はWebサイトの軽量化とスピードについて真剣に考えようと思います。"]
---
## どんなにデザインがイケていても見られないWebサイトは価値がない
いつも思っていますが、見られないサイトは価値がないです。

見られない原因としては、Webサイトが上位に上がってこない、つまり**Googleに評価されていないWebサイト**ということです。

## Googleの評価とは？
ざっくり簡単に説明するとユーザーにとって価値あるコンテンツか、ユーザー閲覧時にストレスを与えていない、この２つが主です。
この２つが評価されれば自ずと価値あるサイトと認められ、順位も上がってきます。

本日は評価対象のユーザー閲覧時のストレスについてフォーカスします。

## Webサイトの表示スピードについて
ユーザー閲覧時のストレスの原因の１つに表示スピードがあります。皆さんも、検索したページを開こうとして、なかなか表示されずイライラ、結果閲覧を諦めた経験があるのではないかと思います。

Googleはユーザーフレンドリーを目指してるので、表示スピードが遅いのはユーザーに優しくないサイト！ということで低評価の一因にもなり得ます。

ではどのような対処ができるのでしょう？

## Webサイトで使用する画像にまずは着目して欲しい
表示スピードの低下の大きな原因の１つに画像が挙げられます。
画像の枚数が多い、画像が大きいなどが読み込みスピードに悪影響を与えています。

* **データ形式は適切か？**<br>まず、画像の種類にあったデータ形式かも確認します。データが無駄に肥大します。
色数の多い風景写真のようなものが形式がPNGになってないか->JPEGへ変える。
アンカーポイントが複雑かつ無駄に多い画像がSVG->PNGへ変えるなど考慮は必要です。
* **画像サイズは適切か？**<br>これ一番あるあるです。まんま使わずトリミングしてください。横幅5000pxとかのままであげるのマジ止めてください。最近では画像をオンラインでトリミングできるサービス山のようにあります。

### 画像を圧縮する
画像サイズを可能な限りオンラインツールもあります。
画像加工ソフトとかない方は、オンラインサービスを使いましょう。

* [I love image](https://www.iloveimg.com/ja/compress-image)
* [compress jpg](https://compressjpeg.com/ja/)
* [Optimizilla](https://imagecompressor.com/ja/)

### 細かいアイコンはCSSスプライトにまとめる
細かいアイコンはCSSスプライトで一枚の画像にまとめてしまいます。
本来5個アイコンがあればサーバに5リクエストするところ、1リクエストですみます。

CSSスプライトの作り方はこちらを参考に

[CSSスプライトのコードは Sass の Mixin にとりあえずまとめとけ！](https://ginneko-atelier.com/blogs/entory291)
### 遅延読み込み(LazyLoad)を使う
1ページあたりにたくさん画像があるのであれば、JSを使って画像の遅延読み込みを実装しましょう。画像の遅延読み込みとは画面をスクロールし、画像がディスプレイ上に現れた際に読み込むテクニックです。<br>
LazyLoadなどjQueryライブラリを利用すれば比較的実装は容易です。

もちろん、画像が初期ロード時に存在しないことになります。解析されないのでSEO的に困るという場合は画像データは構造化データに入れてあげましょう。

```
<script type="application/ld+json">
[
  {
  "@context": "http://schema.org",
  "@type": "ImageObject",
      "url": "https://example.com/neko.jpg",
      "description": "銀ねこ"
  },
{
  "@context": "http://schema.org",
  "@type": "ImageObject",
      "url": "https://example.com/neko2.jpg",
      "description": "銀ねこ2"
  }
]
</script>

```
### CSS、HTML、JSなどのファイルの圧縮
改行もファイルサイズアップに貢献しています。<br>
特にCSSは可読性を追求すると改行だらけになりますよね？<br>

可能であればGulpなどのツールを使えばいいのですがなかなか難しいです。<br>
オンラインサービスで手間をかけずにやりましょう。<br>
なので、サイトリリースの際は圧縮してしまいます。

[Online JavaScript/CSS/HTML Compressor](http://refresh-sf.com/)

### ファイルを一個にまとめる
CSS、JSなどは思い切ってワンソース化しましょう。一個のファイルにまとめたら、サーバへのリクエスト数も減ります。

これもGulpを使えば簡単です。やり方は後日まとめますね。

### CMSなどの最初から用意されてる余分なファイルの読み込みをやめる
WordPressなどでは、あらかじめ絵文字とか用意してありますが正直いらんです。<br>
WordPressの場合余分なファイルの読み込みは以下で止めることができます。

```
// 不要な機能を停止
// 絵文字
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');// 管理画面（ダッシュボード）での絵文字
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');//余分なJSの読み込みを読み込まない
function my_delete_local_jquery()
{
//お問い合わせフォームは読み込む
    if (is_page('contact')) {
        wp_deregister_script('jquery');//jQuery
        wp_dequeue_script('google-recaptcha');//リキャプチャ
        wp_deregister_style('contact-form-7');//contact form 7
    }
}
add_action('wp_enqueue_scripts', 'my_delete_local_jquery');
```

ただし、フォーム系のプラグインを入れていると動かなくなることもあるので気をつけましょう。

### Lighthouseでチェック
ChromeのサイトチェックツールにLighthouse（Google拡張機能）というものがあります。シークレットブラウザで、使えるようにしておくことがミソです。

[Lighthouse(Google拡張機能)](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=ja)

Chromeでシークレットブラウザで使えるようにする方法は別記事にまとめます。

## まとめ
いかがでしたでしょうか？<br>
全ての項目を実施すると相当ページの読み込みスピードは早くなります。<br>
でもコンテンツをとことん読んで欲しい時はページそのものをamp化しちゃうのが一番いい気がします。

最後までお読みいただきありがとうございました。
