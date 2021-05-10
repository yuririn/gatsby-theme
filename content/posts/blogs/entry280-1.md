---
title: concrete5サイトが突然の文字化け！データベース設定で回避
date: 2018-07-22
hero: 2014/entry175.jpg
pagetype: blog
cateId: cms
tags: ["DB","concrete5"]
description: 突然、昔納品したconcrete5がサイトが文字化けしました。データベースを読み込む際のOption設定で文字化けを回避できるのでそのやり方についてご紹介します
lead: ["突然、昔納品したconcrete5がサイトが文字化けしました。データベースを読み込む際のOption設定で文字化けを回避できるのでそのやり方についてご紹介します"]
---
## concrete5の設定で気をつけること
concrete5では、あらかじめphp.iniや.htaccessで文字コードをUTF-8に設定しておくのは必須です。データベースもutf8_general_ciで新規作成します。これをしておかないとインストール時にカオスになることも。。。

レンサバなどで簡単インストールなどが付いている場合はそっちでやったほうが失敗は少ないのでおすすめです。

[concrete5インストールまでの準備](https://concrete5-japan.org/help/5-6/install/gettingready/)

## 突然の文字化け
今回は、X-serverに実装しているconcrete5サイトが文字化けしてしまいました。それまでは通常通り見れていました。sqlデータ落としてファイル開いてみたけど異常なし。

X-serverはCGI版でphp.iniを変更することができます。

サーバー内を確認すると.htaccessとphp.iniが更新されている形跡が。。。エンコードもなぜかEUCになっておりなぜこんなことになったのかが分からず、とりあえずUTF-8に変えて更新。それでも相変わらず文字化けが直らない。

うちの会社で運用しているサイトではないですが、とても付き合いの長い方のお客様だったので早く解決してあげたいし、原因は分からないし途方に暮れていると、concrete5側でデータベース設定ができることを思い出しました。

## concrete5側でデータベースのdriverOptionsを修正
concrete5にはapplication/config/内にdatabase.phpというファイルがあり、ここにデータベースの設定があります。ここでMySQLを読み込むドライバーのオプション設定を変えることができます。

[MySQLとPDOの組み合わせでcharsetを指定する](https://qiita.com/hiro_y/items/6fabdef669e35e92bdc4)

concrete5でのデフォルトのドライバーはPDOが指定されてます。以下のコードを追加します。

```
'driverOptions' => array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8')
```
MYSQL_ATTR_INIT_COMMANDの文字コードをutf8にセット。場合によってはutf8だけでいい場合も。

まずはMySQLの文字コードをよく確認してみてください。

## とりあえずは一件落着
最近、大きなアップデートがあったことで思い当たる節は、WAFに対応？PHPのバージョン?結局、なんで急に文字化けしたのかは分からないです。。。。

もしみなさんも困った時はやってみてください。
