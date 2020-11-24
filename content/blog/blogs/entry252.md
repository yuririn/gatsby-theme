---
title: FuelPHPでテンプレートを実装する
date: 2015-07-09
category: ['Back End']
cateId: ['back-end-program']
tags: ["fuelPHP"]
description: 去年の海の日三連休もFuelPHPを触っていたことがわかりなんかおもろかったです。とりあえず、FuelPHPでテンプレートを作ったのでまとめます。
lead: ["フロントエンドエンジニアのかみーゆです。","去年の海の日三連休もFuelPHPを触っていたことがわかりなんかおもろかったです。","とりあえず、FuelPHPでテンプレートを作ったのでまとめます。"]
---
## FuelPHPてなんぞ？
php５.3で書かれた軽量のHMVC（階層化されたMVC）なphpテンプレートエンジン。調べてみると2010年に開発が始まってるので結構新しい。MITライセンスなので誰でも自由に使えます。

[https://ja.wikipedia.org/wiki/FuelPHP](https://ja.wikipedia.org/wiki/FuelPHP)

これを使えばログイン画面やコンタクトフォームも簡単に作れるらしい。

今回はこれを使って共通のheader、footerを読み込み、コンテンツはページごとに違うというのをやってみます。
## ベースになるテンプレートのview部分を作る
まずはベースの部分のview部分を作成します。

fuel/apps/views/template.php
```
<?php echo Html::doctype('html5') ?>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title><?php echo $title ?></title>
    <?php echo Asset::css('style.css'); ?>
</head>
<body>
<div class="modal">
    <!--[header]-->
    <?php echo $header ?>
    <!--[/header]-->
    <!--[wrapper]-->
    <?php echo $content ?>
    <!--[/wrapper]-->
    <!--[footer]-->
    <?php echo $footer ?>
    <!--[/footer]-->
    </div>
</body>
</html>
```
ヘッダーとフッターも作成
```
<meta charset="utf-8">
<title></title>
<?php echo Asset::css('style.css'); ?>
<?php echo $header ?--><?php echo $content ?--><?php echo $footer ?>
```
fuel/apps/views/elements/header.php
```
<header>
    <h1 class="modal-container">
    <?php echo Asset::img('footer_logo.png', array('id' => 'logo','alt' => "銀ねこアトリエ"));?>
        銀ねこアトリエ
    </h1>
</header>
```
fuel/apps/views/elements/footer.php
```
<footer>
   <?php echo Asset::img('footer_logo.png', array('id' => 'logo','alt' => "銀ねこアトリエ"));?>
</footer>
```
### テンプレート用コントローラーを作成
apps/classes/controller/base.php

classの Controller_Baseはこのコントローラーがbaseだよという意味で、extends Controller_Templateとあるのは、もともと用意されているテンプレート用のコントローラー、templateを継承するよという意味になります。
```
<?php

class Controller_Base extends Controller_Template
{
    //viewテンプレート名
    public $template = 'template';

    //データ初期化
    public $data = array();

    public function before()
    {
        parent::before();
    }

    public function after($response)
    {
        $this->template->header     = View::forge('elements/header',null, false);   // ヘッダー
        $this->template->footer     = View::forge('elements/footer',null, false);   // フッター
        $this->template->title      = "銀ねこアトリエ"; //metaタイトル
        $response = parent::after($response);
        return $response;
    }
}
```
fuel/apps/views/index.php
```
<section>
何かしらコンテンツ
</section>
```
### コントローラーを追加
apps/classes/controller/index.php

ここではbase.phpのコントローラーを継承しています。
```
<?php
class Controller_Index extends Controller_Base
{
    $this---><?php
class Controller_Index extends Controller_Base
{
    $this->template->content = View::forge('index',$this->data,false);
}
```
## おまけ・画像とcssの格納する場所
FuelPHPでは画像やjs・cssの置き場所がプログラムと別になってます。

普通にDLして展開したらprojectの直下にassetsディレクトリがあり、それぞれのフォルダが用意されてるので必要なものはそこに突っ込みます。
```
<?php echo Asset::img('footer_logo.png', array('id' =--><?php echo Asset::img('footer_logo.png', array('id' => 'logo','alt' => "銀ねこアトリエ"));?>
```
上記にあるようにaltやidなどの属性は配列で突っ込むことができます。

しかも自動でクエリがつきます。
