---
title: WordPress で自作した機能を plugin 化してまとめると幸せになれた
date: 2018-08-14
modifiedDate: 2023-01-22
hero: thumbnail/2015/entry235.png
pageType: blog
cateId: cms
tags: ["WordPress"]
description: WordPress のfunctions.php に書いていく、自作した機能をプラグインごとにまとめたらめちゃめちゃ便利だったのでその方法をメモっておきます。
---
WordPress のfunctions.php に書いていく、自作した機能をプラグインごとにまとめたらめちゃめちゃ便利だったのでその方法をメモっておきます。


## WordPress の自作した機能は整理しておかないと、めちゃめちゃカオスになる
WordPress で自作した機能はまとめておかないとめちゃめちゃカオスになります泣（経験者は語る）

自作する機能が増えてくると、ついつい functions.php 内が長ーーいコードになってしまい、後から修正するときに何をどこに書いたか忘れてしまうということもあると思います。コメント入れていますが、どういう関数に書いたか、どんな機能を追加したかも忘れてしまう始末。

その対策として、私は今まで functions.php に機能ごとに分けてインクルードしていました。

```php:title=functions.php
// ショートコード----------------------------------------------
require get_template_directory() . '/functions/shortcode.php';
```

この方法に切り替えてからは、1ファイルにまとめて書いていた頃より、なんぼか楽にはなりましたがやっぱりカオスっちゃカオス。

一個間違えたらみなこける！みんな仲良しすぎ！

どうにかならんもんかなーと思っておりましたら、数年前からプラグインにまとめると幸せになれるよ、という声を各方面からチラチラ聞いていたのでやっと重い腰をあげてやってみることにしました。

## プラグインにまとめるメリット
プラグイン化するメリットは以下の通りです。

* 管理画面をプラグイン一覧を見ればどんな機能を入れたか一目瞭然。運用中は目に見えて使わない機能は何実装していたっけと良くなるので地味に助かるし、コードを書かない人たちにも可視化できるのは嬉しい
* ファイルが機能ごとにまとめられてスッキリ。機能ごとにフォルダにまとめられる上に、めちゃめちゃ整理整頓されます。スパゲティコードも回避できます
* 機能ごとにプラグイン化してあるので、他テーマへの使い回しが楽
* プラグインごとに機能を自作してデバッグすればいいので、何でエラーを吐いているかとか開発もしやすい
チームでも共有・共同開発もしやすくなると思いますし、とにもかくも、**取っ散らかる前にプラグイン化して整理する**に限ります。

## プラグイン化の方法
プラグイン化はとってもカンタンです。

wp-content/plugins 内にファイルを突っ込むだけです。
例えば sample.php といったファイルに機能を書くなら、中身はこんな感じです。

```php:title=sample.php
<?php
/**
* @package sample
* @version 1.0
*/
/*
Plugin Name: サンプル
Description: サンプルだよーーーん
Author: 銀ねこアトリエ
Version: 1.0
Author URI: http://ginneko-atelier.com/
*/
```

## さらに細分化して複数のファイルに機能を分けてフォルダにまとめたい場合
例えば、SEO で必要なタイトルタグやメタディスクリプションなどをカスタムフィールドで投稿画面に実装することもあると思います。<br>
しかも、文字数カウンターをつけたりCSSで調整してリッチにしたい場合、専用のCSSやJSも用意しないといけない場合もあります。<br>
その他 SEO 的に必要な構造化データを出力したくなったりと機能は山盛りになってしまいます。<br>
そんな時こそプラグインにまとめるとスッキリします。

以下のようなファイル構造でプラグインを作ります。

```
seo_set/
  |  customfield.php
  |  jsonld.php
  |  meta.php
  |  ogp.php
  |  seo_set.php
  └ assets /
    ├ css/
     |    seo_style.css
    └ js/
           seo_script.js
```
seo_set.php には以下のようなコードで他のファイル類を読み込みます。

```php:title=seo_set.php
<?php
/**
* @package seo_set
* @version 1.0
*/
/*
Plugin Name: SEOの設定
Description: ページごとに任意のタイトルやサイトの説明を投稿画面から編集できます。
Author: 銀ねこアトリエ
Version: 1.0
Author URI: http://172.16.54.25/
*///プラグインのパス
define('SEO__PLUGIN_DIR', plugin_dir_path(__FILE__));
//各ファイルをインクルードする
require_once(SEO__PLUGIN_DIR . 'customfield.php');
require_once(SEO__PLUGIN_DIR . 'jsonld.php');
require_once(SEO__PLUGIN_DIR . 'meta.php');
require_once(SEO__PLUGIN_DIR . 'ogp.php');
```

あとは各ファイルにコードを書いていきます。

## おまけ：プラグイン内のCSSやJSを管理画面に適応する場合
プラグイン内のJSやCSSを管理画面に適応する場合は`admin_enqueue_scripts`を使用します。scripts なんて言っているけどスタイルとかのデータも追記してくれます。

個人的には管理画面くらいなら、モバイルファーストインデックスを意識しなくていいと思うので、ファイルが多少細分化しても管理画面が重くなけりゃいいと思う。

ちなみに、エンキュー(encueue)とはキュー(cueue/先に入れたものが先に出る構造になっている何か)にデータを入れることだそう。

よくキュー状態とか言いますよね？会社で複数人で一つのプリンターとか使った経験がある人ならわかるかも。

```php:title=PHP
// CSS/JSの読み込み
function custom_enqueue($hook_suffix)
{
    // 新規投稿または編集画面のみに適応
    if ('post.php' == $hook_suffix || 'post-new.php' == $hook_suffix) {
        $jspath = plugins_url('assets/js/script.js', __FILE__);
        $csspath = plugins_url('assets/css/css_style.css', __FILE__);        wp_enqueue_script('Vue.js', '//cdnjs.cloudflare.com/ajax/libs/Vue.js/2.5.2/Vue.js.min.js', array(), '1.0.0', true);
        wp_enqueue_script('seo_script', $jspath, array(), '1.0.0', true);
        wp_enqueue_style('seo_css', $csspath, array(), '1.0.0');
    }
}// 関数を管理画面のキューアクションにフック
add_action('admin_enqueue_scripts', 'custom_enqueue');
```
admin_enqueue_scripts の用法もっと詳しく載ってないかなと思い、WordPress Codex 行ってリファレンス探してみたら英語しかありませんでした笑

[Plugin API/Action Reference/admin enqueue scripts](https://codex.wordpress.org/Plugin_API/Action_Reference/admin_enqueue_scripts)

## まとめ：たくさんカスタマイズしたいならプラグイン化するのは絶対オススメ！
以上、WordPress の自作した機能をWordPressにまとめる方法をご紹介いたしました。

今回はプラグイン化の方法のみのご紹介です。

<prof></prof>
