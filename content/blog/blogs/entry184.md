---
title: FancyBox・iframeの高さの変更方法
date: 2014-08-10
pagetype: blog
category: ['Front End']
cateId: ['front-end-program']
tags: ["JavaScript","jQuery"]
description: JqueryでPopupWindowを開くというのを昨日メモしましたが、ライブラリーを使ってもっとかっこよくしたい！ということでFancyboxがお勧めということで使ってみました。ギャラリーや動画などもかっこよく開けて良い感じでした。
lead: ["現役フロントエンドエンジニアのかみーゆです。","jQueryでPopupWindowを開くというのを昨日メモしましたが、ライブラリーを使ってもっとかっこよくしたい！ということでFancyboxがお勧めということで使ってみました。ギャラリーや動画などもかっこよく開けて良い感じでした。"]
---
## fancyBoxをDLしてみよう
fancyBoxはクリックするとギャラリーや、動画などをポップアップ表示できる便利なJQueryライブラリーです。

[Fancybox deompage](http://fancyapps.com/fancybox/)

ZIPを解凍して<head>に外部ファイルをおきます。

![クリックしても反応しない！？](./images/2014/entry184-1.jpg)
* jQuery.fancybox.js
* jQuery.fancybox.css
* jQuery.js（軽量タイプのjQuery.min.js使用します）

jQuery.jsは面倒なので外部ファイルはおかずGoogleからとってきました。もちろんZIP内のものを使ってもOKです。

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js">
<script src="jquery.fancybox.js">
</script>
<link href="jquery.fancybox.css" media="screen" rel="stylesheet" type="text/css">
```

source内にある素材をそのまま使う場合、必要に応じてCSSからパスを書き換えておくとよいです。 ほとんどの素材はbackground（背景）で入ってます。

```
background: url('fancybox_loading.gif') center center no-repeat;
// 以下に書き換える
background: url('../img/fancybox_loading.gif') center center no-repeat;
```

通常のFancybox。内にJavascript、htmlにはクラスfancyboxにするだけ。

```
<!--javascript-->
<script>
    $(document).ready(function() {
        $('.fancybox').fancybox();
    }
</script>
<!--html-->
<a class="fancybox" href="1.jpg"   title="ねこの画像"><img src="1_s.jpg" alt="" /></a>
```
## iframeの高さがなぜか設定できない
困ったことにfancyboxでiframeを使用しなければならなかったのですが、高さがなぜか設定できないことにはまってしまいました。

ネットで検索したら「**'autoScale' : false**」に設定しろというのを多く見かけましたが、まったく効きません（笑）あちこち検索した結果、「**'autoSize' : false**」に変更したらうまくいきました。

ネットの情報って検証した内容か不明、そして情報が古い可能性もあるので要注意ですね。。。

```
<script>
$(document).ready(function() {
    $('.fancybox').fancybox({
    'type' : 'iframe',
        'width' : 500,
        'height' : 400,
    'scrolling' : 'no',
        'autoSize' : false
    });
});
</script>
```

WidthとHeightは％でも指定できます。

後はfancyboxを設定したい要素のタグにdata-fancybox-type="iframe"を追記します。これでオッケー！

```
<li><a class="fancybox fancybox.iframe" href="iframe.html"  data-fancybox-type="iframe">Iframe</a></li>
```

## まとめ
fancybox本当に便利なのでいろいろ活用しようと思います。
