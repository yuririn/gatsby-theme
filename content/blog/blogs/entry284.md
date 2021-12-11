---
title: MySQL を 5.1 から 5.7 系にアップグレードする際にハマりました
date: 2018-09-23
hero: 2014/entry208.png
pagetype: blog
cateId: 'web-developer'
tags: ["DB"]
description: grant の MySQL を 5.1 から 5.7 系にアップグレードする際にどハマりし、結局助けてもらってなんとかアップグレードしたのでそのやり方をメモします。
lead: ["grant の MySQL を 5.1 から 5.7 系にアップグレードする際にどハマりし、結局助けてもらってなんとかアップグレードしたのでそのやり方をメモします。"]
---
## MySQLのアップグレード
バックのことはさほど分かっていないくせに、Vagrant を構築してしょっ中作っては壊しています。

もっぱら Vagrant の構築はいただきもののシェルスクリプトを使いまわしてます。めちゃめちゃ重宝していて、たまに改変してます。

ちょっと前に作成したサイトを最近リニューアルする必要があり、本番環境のMySQL の 5.7系だったので、仮想環境も念のため 5.7にしなければならず。。。

しかしいただいたシェルスクリプトは 5.1 系で書いてあるし、インストールの仕方が違うらしくシェルスクリプトを改造する自信はなく。。。。

一応改造は試みましたがうまく行かず撃沈。いったん構築してしまってアップグレードすることにしました。

## MySQL 5.1 から 5.7 に アップグレードするには2段階のステップを踏まなければならない
ワタクシの環境はちなみに CentOS 6.4 です。

MySQL 5.1 が古いのか、バージョンアップするためにはまず、5.6系にあげなければならないそう。

こちらのブログを参考にさせていただきました。

[MySQL5.1から5.7にバージョンアップさせるための手順](https://qiita.com/tachitechi/items/b59278a16f636651410f)
## まずは 5.6 系へアップグレード
vagrant sshで入り、まずはバージョン確認。

```bash
# vagrant ssh
```
特権レベルにセット。

```bash
# sudo -i
```
まずはmysqlをシャットダウン。
```bash
# service mysqld stop
```
既存のmysqlを削除
```bash
# yum remove mysql*
```

```bash
# yum -y install http://dev.mysql.com/get/mysql-community-release-el6-5.noarch.rpm
```
落ちてこない人は直接、ルートにmysql-community-release-el6-5.noarch.rpmを置いて yum install すればいいと思う。

```bash
cd /vagrant
# yum -y install mysql-community-release-el6-5.noarch.rpm
```
```bash
# yum-config-manager --disable mysql55-community
# yum-config-manager --enable mysql56-community
```

yum-config-managerでエラーになる人は以下コマンドを実行して、上のコマンドをもう一度叩いてみてください。

[[yum]yum-config-managerコマンドの実行でcommand not foundエラー](https://akamist.com/blog/archives/942)

```bash
# yum -y install yum-utils
```
インストール。
```bash
# yum install mysql mysql-devel mysql-server mysql-utilities
```
ここですでにDBがあるとおそらく mysqld が起動できないはずです。

なので、まずはログを確認してみます。
```bash
# less /var/log/mysqld.log
```
Mac ではログファイルを開いたら shift + g で一番下まで行けます。

`b` で1ページ戻り、space で次のページ、`q` でログファイルを抜けることができます。

先に DB を作ってしまってたせいか、不要なファイルができていたのでこいつを削除しにいきます。

ちゃんとした理由についてはこちらをご覧ください。

[my.cnfでinnodb関連の設定後、MySQLが起動しなくなった](https://www.ilovex.co.jp/blog/system/projectandsystemdevelopment/mycnfinnodbmysql.html)

ディレクトリーを移動して中身を確認。
```bash
# cd /var/lib/mysql
# ls(もしくはll)
```

下の三つが不要なので強制削除します。<br>
※もちろんエラー内容を確認の上削除。
```bash
# rm -rf ib_logfile0
# rm -rf ib_logfile1
# rm -rf ibdata1
```
### Fatal error: Can't open and lock privilege tables: Table 'mysql.user' doesn't existというエラーが出た場合
インストール時に mysql_install_db が実行されるが、ディレクトリがわからない状態なので、インストール場所とユーザ名を指定して明示的に実行すると良いようです。

```bash
# mysql_install_db --datadir=/var/lib/mysql --user=mysql
```
[MySQLの起動時に "Fatal error: Can't open and lock privilege tables: Table 'mysql.host' doesn't exist"というエラーが出た](http://satoh-d.hatenablog.com/entry/2015/04/11/100204)
これで無事再起動できるはずです。
```bash
# service mysqld start
```
アップグレードします。
```bash
# mysql_upgrade -u root
```
パスワードを設定している場合はお尻に -p をつけてパスワード入力します。
```bash
# mysql_upgrade -u root -p
```
バージョン確認。
```bash
# mysql --version
```
ようやく5.6系になりました。
## 5.7にアップグレード
続けて、5.7 にアップグレードします。

まずはmysqlをシャットダウン。
```bash
# service mysqld stop
```
せっかく作ったけど、のmysqlを削除。
```bash
# yum remove mysql*
```
5.7を有効化
```bash
# yum-config-manager --disable mysql56-community
# yum-config-manager --enable mysql57-community-dmr
```
インストール
```bash
# yum install mysql mysql-devel mysql-server mysql-utilitie
```
```bash
# service mysqld start
# mysql_upgrade -u root
//もしくは
# mysql_upgrade -u root -p
```
無事アップグレードできているはずです。
```bash
# mysql --version
```
### まとめ
今回 MySQL のバージョンアップにチャレンジすることで、mysql のエラーログの見方を覚えたりバージョンの切り替えを覚えることができました。

ハマってよかったーーー。
