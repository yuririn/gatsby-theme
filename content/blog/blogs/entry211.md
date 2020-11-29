---
title: WordPressでショートタグを作ってみた
date: 2014-12-21
hero: 2014/entry211.png
pagetype: blog
category: 'CMS'
cateId: 'cms'
tags: ["WordPress"]
description: みんな大好きWordPress!今回はショートタグの作り方をご紹介します！！
lead: ["フロントエンドエンジニアのかみーゆです。","みんな大好きWordPress!今回はショートタグの作り方をご紹介します！！"]
---
## 単刀直入にショートタグの作り方から
ショートタグは投稿でphpの代わりに使えるワードプレス専用のタグです。

変数や関数が使えるのでとっても便利です。

たとえば、サイトのURLのショートタグを作りたいときのコードの書き方はこんな感じ。functions.phpに追記するだけです。

```
function home_url(){
    $home = home_url();
    return $home;
}
add_shortcode('URL', 'home_url');
```
固定ページには以下のように記述すればよいだけ

```
<a href="[URL]">トップページ</a>
```
独自で作ったthemeの中にimagesフォルダーを設置し、そのイメージを使いたい時はこんな感じ。
```
function imagePath(){
    $imagepath = bloginfo('template_url').'/images';
    return $imagepath;
}
add_shortcode('images', 'imagePath');
```
```
<img src="[images]/ginneko.gif" alt="銀ねこ"/>
```
## スラッグからURLを引き出す
今回ローカルでWordPressのカスタムURLが使えなかったのと、そういう事例を多々見かけたのでその対策として、URLがカスタムでもデフォルトでも対応できるようにしたかったというのもあったのですが、どちらにしても指定したページにリンクが飛ぶように設定する必要がありました。

ショートタグを利用すれば引数も使えます。

引数にスラッグを入れてURLを設定すればいいやん！

ということで、リンク先が固定ページだったので下記の通りfunctions.phpに追記。
```
function srug($atts){
    extract(shortcode_atts(array(
    'srug' => ''
    ),$atts));
    $page = get_page_by_path($srug);
    $p_slugLink = get_permalink( $page->ID );
    return $p_slugLink;
}
add_shortcode('srugURL', 'srug');
```
今回スラッグ名をformにしたので投稿するときは以下の通り記載すればOK。
```
<a href="[srugURL srug=’form']">お問い合わせページ</a>
```
ただしリンク先が固定ページ用なので、もしアーカイブなど投稿記事用に変更したいときは以下のように書き換えが必要です。
```
$cat = get_category_by_slug($srug);
$cateLink = get_category_link( $cat->cat_ID );
```
## まとめ
引数が存在しないときは、ホームのURL、リンク先カテゴリーがアーカイブ時はといった感じでうまいこと条件分岐すればもっと便利なでショートタグができそうですね！
