---
title: Docker でサーバー側のエラーログ(PHP Warning)を出力
date: 2025-02-22
pageType: blog
hero: thumbnail/2025/entry544.jpg
cateId: web-developer
tags: ["Docker","PHP","コマンド"]
description: Dockerを使用して自分のコードのエラーが確認できる環境を構築する手順を紹介。Nginx、PHP-FPM、MariaDBのコンテナ作成、エラーログの設定と出力確認、リアルタイムでのエラー監視方法を解説。HPにおける典型的なエラーを理解し修正する方法を丁寧に解説します。サーバー・インフラの知識がなくても、Dockerを使用してコードのエラーが確認できる環境を構築する手順を解説。
faq:
  - q: "PHP Warning が画面には表示されず、ログファイルにだけ記録されるのはなぜですか？"
    a: "php.ini の設定で `display_errors = Off` かつ `log_errors = On` になっているためです。開発環境では [php.ini の設定](#phpエラーログが出力できるか確認してみる) を一時的に `display_errors = On` にすると画面上でも即座に確認できますが、本番環境ではセキュリティ上、Offのままログで監視するのが鉄則です。"
  - q: "tail -f コマンドでログを監視しているのに、エラーを発生させても何も表示されません。"
    a: "ログファイルの書き込み権限（パーミッション）が不足しているか、PHP-FPMが参照しているログパスが間違っている可能性があります。コンテナ内で `ls -l /var/log/php_errors.log` を実行し、実行ユーザー（www-dataなど）に書き込み権限があるか確認してください。詳細は [リアルタイムでモニタリングする](#リアルタイムでモニタリングしながらエラーを監視する) をご覧ください。"
  - q: "Dockerコンテナ全体のログをまとめて確認する方法はありますか？"
    a: "特定のファイルだけでなく、コンテナの標準出力を確認したい場合は `docker logs -f [コンテナ名]` コマンドが便利です。PHP-FPMの設定によっては、エラーログを標準出力にリダイレクトさせることで、ファイルを開かずにターミナル上で一括管理することも可能です。"
  - q: "Cannot modify header information... という Warning の解決策は？"
    a: "これは `header()` 関数の前に、意図しない空白や HTML 出力、あるいは `echo` が行われている場合に発生します。ログを監視しながら、エラーが発生した行の直前に余計な出力がないかチェックしましょう。代表的な Warning への対処は [一般的なPHP Warning表](#phpエラーログが出力できるか確認してみる) にまとめています。"
---
この記事は、[Docker で本番環境に忠実な開発環境を作る（nginx、PHP-FPM、MariaDB）](/blogs/entry543/)の続きです。運用しているWebサイトの本番環境で PHP Warning が発生してしまいました。そのエラーを修正したいのにエラーを見ることができず、修正できたかわからない状況に陥りました。

> PHP Warning（警告）　は、スクリプトの実行中に ***非*致命的** なエラーが発生したときに表示されるメッセージ
次はよく起こる *PHP Warning（警告）* です。

* *未定義変数の使用*: 作っていない変数を使おうとする場合
* *配列でないものへのアクセス*: 配列ではないにも関わらず、配列のようにアクセスした場合
* *配列のインデックスが存在しない*: 配列のインデックスが存在しない場合

この記事を試すためには Docker 環境が必要です。先に「 **Docker で本番環境に忠実な開発環境を作る（nginx、PHP-FPM、MariaDB）** 」を参考にしてください。

<card slug="entry543"></card>

<prof></prof>

*この記事の対象者*
* サーバー・インフラのことはあんまりわからない
* 自分のコードのエラーが確認できる環境を構築したい
* Dockerをイチから作ってみたい
* 本番環境と開発環境で使うサーバー、PHP、データベースの種類やバージョンを厳格に揃えたい

## PHPエラーログが出力できるか確認してみる
前回は、PHPエラーをログに残せる設定をコンテナ内に追加したところまでやりました。

エラーログを確認してみましょう。わざとエラーを発生させる、`error_test.php` 作成します。

```
myproject/
   ├-- public/
   │   ├-- index.html
   │   ├-- index.php
   │   └-- error_test.php ← 追加
   ├-- docker/
   │   ├-- nginx/
   │   │   └-- nginx.conf
   │   ├-- errors/
   │   ├--php/
   │   │    ├-- Dockerfile
   │   │    └-- php.ini
   │   └-- db/
   │        └-- init.sql
   └-- docker-compose.yml
```
よくあるPHPの警告を意図的に発生させてみましょう！

未定義変数の使用し、配列でないものへのアクセスの確認した場合。
```php:title=public/error_test.php
<?php
$variable = false;
echo $variable['key'];
echo $undefined_variable;
```
> PHP Warning:  Trying to access array offset on value of type bool
> PHP Warning:  Undefined variable $undefined_variable

他にもPHP Worning はあります。一般的なものを紹介しておきます。

| PHP Warning                                              | 説明                                                                                 |
|----------------------------------------------------------|--------------------------------------------------------------------------------------|
| Division by zero                                         | 0で割ろうとした場合。                                                               |
| Invalid argument supplied for foreach()                  | `foreach` ループに対して無効な引数が渡された場合。                                  |
| array_merge(): Argument #x is not an array               | `array_merge` 関数に配列でない引数が渡された場合。                                  |
| Cannot modify header information - headers already sent  | `header` 関数が呼び出される前に出力が行われた場合。                                |

### リアルタイムでモニタリングしながらエラーを監視する
リアルタイムでモニターしながらも開発できます。

コンテナに入り、logファイルの変更を監視します。`tail`コマンドはファイルの末尾の変更を監視するコマンドです。
```bash:title=コマンド
docker exec -it myproject_php /bin/bash
tail -f /var/log/php_errors.log
```
全部文字が白くてわかりづらいですね。
![コンテナに入り、logファイルの変更を監視します。](./images/02/entry543-7.jpg)

特定のエラー文字を検索して色を付けることもできます。
```bash:title=コマンド
tail -f /var/log/php_errors.log | grep --color=auto -E 'PHP Fatal error|PHP Warning'
```
![特定のエラー文字を検索して色を付けることもできます](./images/02/entry543-8.jpg)

## モジュールの追加などコンテナーの設定をし直したい場合

PHP モジュールの追加などコンテナーの設定をし直した場合は、コンテナを再構築する必要があります。

一度構築したコンテナを再構築するには`docker-compose up --build -d`を使います。

```bash:title=コマンド
docker-compose down
docker-compose up --build -d
```
## まとめ・PHPでも エラーを追いながら開発する
本番環境に忠実な開発環境を準備のは基本です。

私もインフラやサーバーは苦手だから徹底的に調べつくしたり勉強するのは今まで避けてきました。

今回この記事を書くことで Docker への理解がより深まりました。副作用として、サーバーやPHP、MariaDBのこともかなり理解できました。

<msg txt="今回勉強になりとても良い経験になりました"></msg>

この記事がみなさんのコーディングライフの一助と慣れば幸いです。

最後までお読みいただきありがとうございました。
