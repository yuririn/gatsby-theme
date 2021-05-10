---
title: カンタン！wgetでサイトを丸ごとダウンロードする方法
date: 2016-12-09
hero: 2014/entry192.jpg
pagetype: blog
cateId: 'web-developer'
tags: ["コマンド"]
description: wgetコマンド便利です。仕事中ファイルのバックアップをとろうと思いftpソフトでDLしていましたが途中止まってしまいました。なのでwgetコマンドで落とすことにしました。なので、wgetコマンドについてまとめておきます。
lead: ["wgetコマンド便利です。仕事中ファイルのバックアップをとろうと思いftpソフトでDLしていましたが途中止まってしまいました。なのでwgetコマンドで落とすことにしました。","なので、wgetコマンドについてまとめておきます。"]
---
## wgetコマンドってなんぞ？
HTTPアクセスをしてコンテンツをファイルに保存するコマンドです。

homebrewでインストールできます。<br>
ないようならまずはhomebrewをインストール。<br>
ターミナルを開いて下記サイトにあるコードを貼り付けて実行するだけです。

[homebrew](http://brew.sh/index_ja.html)

インストールされたら、次のコードでインストール。
※もし拒否されるようでしたら頭にsudo+スペースをつけてみてください。

ファイルを格納するディレクトリーを作成、移動します。

```
$ brew install wget
```

もしくは

```
$ sudo brew install wget
```

基本のコマンドは以下のとおり。

```
$ wget [option] URL
```
### サイトを丸ごと落としたい

-lはサイトの階層の深さ。0だと全ての階層を落とします。

```
$ wget -r -l0 http://example.com/
```

 --convert-linksをつけるとローカルでもみれるよう絶対パスを相対パスに書き換えてくれます。

 ```
 $ wget -r -l0 --convert-links http://example.com/
 ```

## ベーシック認証のかかったサイトをDL
パスワードとIDを追加します。

```
$ wget --http-user=user --http-passwd=password http://example.com/
```
